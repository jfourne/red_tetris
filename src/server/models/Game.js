import Player from './Player';
import {GAME_STATUS, MAX_GAMES, TICK_LENGTH_MS} from '../config/config_game'
import * as event from '../config/config_socket'
import * as gameAction from '../actions/game'
import {reduce2DArray} from '../services/utility'
import Board from './Board';
import { subLobby, subGame, unsubGame } from '../socket/eventHandler';



class Game {

  /**
   * Game initialisation
   */

  constructor(players, spectators, lobbyReset) {
    this._state = GAME_STATUS.PREGAME
    this._seed = Math.random()
    
	this._nbPlayers = players.length;
    this._players = players.map((player) => {
      return {
		id: players.indexOf(player),
        player: player,
        board: undefined,
        isDisconnected: false
      }
    })
    this._spectators = spectators

    this._gamePrevTick = Date.now();
	this._gameActualTicks = 0;
	this._lobbyReset = lobbyReset;
  }

  getPlayer(id) {
    if (id >= 0 && id < this._players.length) {
	  return this._players[id];
	}
    return undefined;
  }



/**
 * GAME EVENTS
 */

  setGameEvents(gameEvents) {
   this._gameEvents = gameEvents
  }

  start() {
    const broadcast = {board : this.broadcastBoard, combo : this.broadcastCombo}
    this._players.forEach(player => {
      player.board = new Board(player.player.getSocket(), player.id, this._seed, broadcast, this.broadcastBoardSpectator)
      player.player.getSocket().emit(event.GAME, gameAction.gameStart());
      subGame(player.player.getSocket(), this, player.id)
      console.log("create board");
	  });
	  this._spectators.forEach(spectator => {
		  spectator.getSocket().emit(event.GAME, gameAction.gameStart());
	  })
    this._state = GAME_STATUS.GAME
    this.gameLoop()
    this._players.forEach(player => {
      this.broadcastBoard(player.id)
    })
  }

  leaveGame(player, isOwner, playerIndex) {
		const leaver = this._players.find((elem) => {
	        return elem.player === player
		})
		if (leaver) {
			if (leaver.board)
        leaver.board.disconnect();
      leaver.isDisconnected = true;
      unsubGame(leaver.player.getSocket(), this._gameEvents);
		}
  }

/**
 * GAME LOOP
 */



  gameLoop = () => {
    if (this._state != GAME_STATUS.GAME)
      return
    const now = Date.now()
    
    this._gameActualTicks++
    if (this._gamePrevTick + TICK_LENGTH_MS <= now) {
      const delta = (now - this._gamePrevTick) / 1000
      this._gamePrevTick = now
      this.update(delta)
      this._gameActualTicks = 0
    }
  
    if (Date.now() - this._gamePrevTick < TICK_LENGTH_MS - 16) {
      setTimeout(this.gameLoop)
    } else {
      setImmediate(this.gameLoop)
    }
  }
  
  resetGameTick = (playerid) => {
    this._players[playerid].board._prevFall = Date.now();
  }

  update = () => {
    this._players.forEach(player => {
      if (player.board.isAlive()){
        player.board.update();
      }
    });
    this.checkGameEnd();
  }

  broadcastBoard = (id) => {
    this._players.forEach(player => {
      if (player.id !== id && !player.isDisconnected) {
        player.player.getSocket().emit(event.GAME, gameAction.board({
          board : reduce2DArray(this._players[id].board.getBoard()),
          id : this._players[id].player.getSocket().id,
          main: false
        }))
      }
	});
  }

  broadcastBoardSpectator = (board, socketId, id) => {
	if (this._spectators.length) {
		let boardToSend = {
				board : board,
				id : socketId,
				main : id ? false : true,
		}
		this._spectators.forEach(spectator => {
			spectator.getSocket().emit(event.GAME, gameAction.board(boardToSend));
		})
	}
  }

  broadcastCombo = (id, combo) => {
    this._players.forEach(player => {
      console.log("OUT");
      if (player.id !== id && !player.isDisconnected && player.board) {
       console.log("IN");
      player.board.receiveCombo(combo);
      }
    });
    this._players.forEach(player => {
      this.broadcastBoard(player.id)
    });
  }

  /**
   * END GAME
   */

  checkGameEnd() {
    let nbPlayersAlive = 0;
    let winner = undefined;

    for (let i = 0; i < this._nbPlayers; i++) {
      if (this._players[i].board.isAlive()) {
        nbPlayersAlive++;
        winner = this._players[i];
      }
    }
    if (this._nbPlayers > 1 && nbPlayersAlive <= 1) {
      this.multiGameEnd(winner)
    }
    else if (this._nbPlayers === 1 && nbPlayersAlive === 0) {
      this.soloGameEnd()
    }
  }

  multiGameEnd(winner) {
    this._players.forEach((player) => {
      player.player.getSocket().emit(event.GAME, gameAction.gameEnd({
        winner : winner ? winner.player.getName() : "EMPTY ROOM",
	  }))
    });
    this.handleSpectatorEnd(winner);
    this._state = GAME_STATUS.POSTGAME;
    this._players.forEach(player => {
		  unsubGame(player.player.getSocket())
		  delete player.board;
	  });
	  this._lobbyReset();
    console.log("GAME ENDED");
  }

  soloGameEnd() {
  const winner = this._players[0]
  
  winner.player.getSocket().emit(event.GAME, gameAction.gameEnd({
	  winner : winner.player.getName(),
  }))
  this.handleSpectatorEnd(winner);
  this._state = GAME_STATUS.POSTGAME;
	unsubGame(winner.player.getSocket())
	delete this._players[0].board;
	this._lobbyReset();
    console.log("GAME ENDED");
  }

  handleSpectatorEnd(winner) {
    this._spectators.forEach((spectator) => {
      spectator.getSocket().emit(event.GAME, gameAction.gameEnd({
        winner : winner ? winner.player.getName() : "EMPTY ROOM",
      }))
    });
  }
}

export default Game