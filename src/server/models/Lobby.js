import Player from './Player';
import {GAME_STATUS, MAX_LOBBY_SIZE, TICK_LENGTH_MS} from '../config/config_game'
import {subLobby, unsubLobby} from '../socket/eventHandler'
import * as event from '../config/config_socket'
import * as lobbyAction from '../actions/lobby'
import {reduce2DArray} from '../services/utility'
import Game from './Game';
import { runInThisContext } from 'vm';

class Lobby {

  constructor(id, owner, lm) {
    this._id = id;
    this._name = owner.getName();
    this._owner = 0;
    this._players = [owner];
    this._spectators = [];
    this._state = GAME_STATUS.PREGAME;

	this._game = undefined;
	this._lm = lm;
  }

  init(player){
    console.log("INIT LOBBY");
  }

  reset = () => {
	this._state = GAME_STATUS.PREGAME;
    console.log("RESET  LOBBY");
  }

  getId() {
    return this._id;
  }

  getName() {
	  return this._name;
  }

  getPlayers() {
    return this._players;
  }

  getSpectators() {
    return this._spectators;
  }

  getOwner() {
    return this._players[this._owner]
  }

/**
 * LOBBY FUNCT
 */

// CHANGE USER ROLE
  switchUserRole(playerName, role) {
	let findPlayer;
	let addTo;
	if (role === "PLAYER") {
		this._players = this._players.reduce((res, user) => {
			if (user._name === playerName)
				findPlayer = user;
			else {
				res.push(user);
			}
			return res;
		}, [])	
		addTo = this._spectators;
	} else if (role === "SPECTATOR") {
		this._spectators = this._spectators.reduce((res, user) => {
			if (user._name === playerName)
				findPlayer = user;
			else {
				res.push(user);
			}
			return res;
		}, [])	
		addTo = this._players;		
	}

	if (findPlayer) {
		addTo.push(findPlayer);
		findPlayer._socket.emit(event.LOBBY, lobbyAction.switchRole())

		this.broadcastUsers();
	}
  }

// CHANGE LOBBY OWNER
  broadcastRoomOwner() {
	  this._players.map((player) => {
		  player._socket.emit(event.LOBBY, lobbyAction.setLobbyOwner(this.getOwner()._name))
	  })
	  this._spectators.map((spectator) => {
		  spectator._socket.emit(event.LOBBY, lobbyAction.setLobbyOwner(this.getOwner()._name))
	  })
  }

  setOwner(playerName, left) {
	  let playerIndex = -1;
	  this._players.forEach((player, index) => {
		if (player._name === playerName) {
			playerIndex = index;
		}		
	  });
	  if (playerIndex !== -1) {
		if (left !== true)
			this._players[this._owner]._socket.emit(event.LOBBY, lobbyAction.setOwner(false));
		this._owner = playerIndex;
		this._players[this._owner]._socket.emit(event.LOBBY, lobbyAction.setOwner(true));
		this.broadcastRoomOwner();
	  }
  }

// BROADCAST NEW ROOM INFO TO ALL USER INSIDE IT
  broadcastUsers() {
	const ret = this._players.map((player) => {
		return {
		isOwner: (player === this.getOwner()),
		playerName: player.getName(),
		role: 'PLAYER'
		}
	}).concat(this._spectators.map((player) => {
		return {
		isOwner: false,
		playerName: player.getName(),
		role: 'SPECTATOR'
		}
	}));
	this._players.map(player => {
		player._socket.emit(event.LOBBY, lobbyAction.getUsers(ret))

	});
	this._spectators.map(spectator => {
		spectator._socket.emit(event.LOBBY, lobbyAction.getUsers(ret))
	});
  }

  forceQuitSpectators() {
	  this._spectators.forEach(spectator => {
		  spectator._socket.emit(event.LOBBY, lobbyAction.lobbyDeleted());
		  unsubLobby(spectator._socket);
		  this._lm.joinMainLobby(spectator, true)
	  });
  }

  joinLobby(player, isPlayer) {
    if (isPlayer
		&& (this._state === GAME_STATUS.PREGAME
			|| this._state === GAME_STATUS.POSTGAME)
        && this._players.length < MAX_LOBBY_SIZE) {
      this._players.push(player)
    }
    else {
		this._spectators.push(player)
	  player._socket.emit(event.LOBBY, lobbyAction.switchRole());
	}
	subLobby(player.getSocket(), this)
	this.broadcastUsers();
  }

  leaveLobbySpectator(player) {
	  let i;
	  i = this._spectators.indexOf(player);
	  if (player) {
		unsubLobby(player._socket);
		if (i != -1)
			this._spectators.splice(i, 1);
		this.broadcastUsers();
	  }
  }

  leaveLobby(player) {
	let i;
	i = this._players.indexOf(player);
    if (player) {
      if (this._game) {
		this._game.leaveGame(player, player === this._players[this._owner], i);
	  }
	  if (player === this._players[this._owner])
		player._socket.emit(event.LOBBY, lobbyAction.setOwner(false));
		unsubLobby(player._socket);
      if (i != -1) {
		  this._players.splice(i, 1);
		  if (this._players.length) {
			  if (i === this._owner)
			  	this.setOwner(this._players[0]._name, true);
			  this.broadcastUsers();
		} else {
			delete this._game;
			this.forceQuitSpectators();
			this._lm.deleteLobby(this._id);
		}
	  } else {
		this.leaveLobbySpectator(player);
	  }
      return true;
    }
    else {
	  return false;
    }
  }

  createGame() {
	this._state = GAME_STATUS.GAME
	if (this._game)
		delete this._game;
	this._game = new Game(this._players, this._spectators, this.reset);
  	return this._game;
	}
}

export default Lobby