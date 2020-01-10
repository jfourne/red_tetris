import LobbyManager from '../models/LobbyManager'
import Lobby from '../models/Lobby'

import Game from '../models/Game'
import * as event from '../config/config_socket'

import * as actionGame from '../actions/game'
import * as actionGetLobbies from '../actions/getLobbies'
import * as actionInit from '../actions/initPlayer'
import * as actionLobby from '../actions/lobby'
import * as actionError from '../actions/myError'

import {GAME_STATUS} from '../config/config_game'
import Board from '../models/Board'

import {reduce2DArray, emitError} from '../services/utility'
import { EventEmitter } from 'events'

// event.INIT_PLAYER


export const subInitPlayer = (socket, player, lm) => {
  const initPlayer = (playerName) => {
    console.log("-  initPlayer  - ", socket.id);
    console.log("*" + playerName)
    player.initPlayer(playerName);
	  lm._mainLobby.push(player);
    subMainLobby(socket, lm, player);
	  socket.emit(event.INIT_PLAYER, actionInit.initPlayer(player._name));
  }
  socket.once(event.SIGNAL + event.INIT_PLAYER, (action) => initPlayer(action.name))
}

// event.CREATE_ROOM
// event.JOIN_ROOM
// event.GET_ROOMS // TO IMPLEMENT

export const subMainLobby = (socket, lm, player) => {
  const createLobby = () => {
    console.log("-  createLobby  - ", socket.id);
    console.log("*" + player._name)
    const lobby = lm.reqNewLobby(player);
    subLobby(socket, lobby.lobby);
    socket.emit(event.LOBBY, actionLobby.createLobby({
      id : lobby.lobby.getId(),
	    playerName : player.getName(),
	    owner : lobby.lobby.getOwner()._name,
	  }))
	  socket.emit(event.LOBBY, actionLobby.setOwner(true));
	  subLeaveLobby(socket, lm, player, lobby.lobby.getId());
	  lm.leaveMainLobby(socket);
  }

  const joinLobby = (lobbyId, lobbyName) => {
    const lobby = lm.getLobby(lobbyId);
    if (lobby === undefined || lobby._name !== lobbyName) {
	    emitError(socket, "JOIN_LOBBY failed");
	    socket.emit(event.LOBBY, actionLobby.createLobby({
		  id : -1,
		  playerName: undefined,
		  owner: undefined,
	    }))
      return
    }
    console.log("-  joinLobby  - ", socket.id);
    console.log("*(" + lobbyId + ")" + lobbyName)
    lobby.joinLobby(player, true);
      socket.emit(event.LOBBY, actionLobby.createLobby({
      id : lobby.getId(),
      playerName : lobby.getName(),
      owner : lobby.getOwner()._name,
    }))
    subLeaveLobby(socket, lm, player, lobbyId);
    lm.leaveMainLobby(socket);
  }

  const getLobbies = () => {
    console.log("-  getLobbies  - ", socket.id);
		let lobbies;
		lobbies = lm.getLobbies().reduce((res, lobby) => {
			if (lobby.lobby) {
				res.push({
					id: lobby.id,
					name: lobby.lobby._name,
					ongoing: lobby.lobby._state,
					nbPlayer: lobby.lobby._players.length,
				})
			}
			return res
		}, [])

		if (lobbies)
			socket.emit(event.GETLOBBIES, actionGetLobbies.getLobbies(lobbies));
  }

  socket.on(event.SIGNAL + event.MAINLOBBY, (action) => {
    switch (action.type) {
      case event.TYPE + event.T_CREATE_LOBBY :
        createLobby()
        break;
      case event.TYPE + event.T_JOIN_LOBBY :
        joinLobby(action.roomId, action.roomName)
        break;
      case event.TYPE + event.T_GET_LOBBIES :
        getLobbies()
        break;
    }
  })
}

export const unsubMainLobby = (socket) => {
	socket.removeAllListeners(event.SIGNAL + event.MAINLOBBY);
}

// event.LEAVE_ROOM // don't unsub need it in Game
export const subLeaveLobby = (socket, lm, player, id) => {
  const leaveLobby = () => {
    console.log("-  leaveLobby  - ", socket.id);
    console.log("*" + id)
    const lobby = lm.getLobby(id);
    if (lobby === undefined) {
      emitError(socket, "LEAVE_ROOM failed: lobby not found");
      return
    }
    if (!lobby.leaveLobby(player)) {
      emitError(socket, "LEAVE_LOBBY failed: player not in lobby");
      return
    }
    lm.joinMainLobby(player, true)
  }

  const disconnect = () => {
    console.log("-  disconnect  - ", socket.id);
    console.log("*" + id)
    const lobby = lm.getLobby(id);
    if (lobby === undefined) {
      emitError(socket, "LEAVE_LOBBY failed: lobby not found");
      return
    }
    if (!lobby.leaveLobby(player)) {
      emitError(socket, "LEAVE_LOBBY failed: player not in lobby");
      return
    }
  }
  socket.on(event.SIGNAL + event.LEAVE_LOBBY, (action) => {
    if (action.type === event.TYPE + event.LEAVE_LOBBY)
      leaveLobby()
  });
  socket.on(event.DISCONNECT, () => disconnect());
}

export const unsubLeaveLobby = (socket) => {
  console.log("-  unsubLeaveLobby  - ", socket.id);
  socket.removeAllListeners(event.SIGNAL + event.LEAVE_LOBBY);
}

// event.GET_PLAYERS // to implement
// event.SWITCH_ROLE // to implement
// event.GAME_START

export const subLobby = (socket, lobby) => {
  console.log("-  subLobby  - ", socket.id);
  const gameStart = (id) => {
    console.log(id + ' started the game ');  
    const game = lobby.createGame()
    game.start()
  }

  const getPlayers = () => {
    console.log("-  getPlayers  - ", socket.id);
    const ret = lobby.getPlayers().map((player) => {
      return {
        owner: (player === lobby.getOwner()),
        playerName: player.getName(),
        role: 'PLAYER'
      }
    }).concat(lobby.getSpectators().map((player) => {
      return {
        owner: false,
        playerName: player.getName(),
        role: 'SPECTATOR'
      }
    }));
    socket.emit(event.LOBBY, actionLobby.getUsers(ret))
  }

  const switchRole = (playerName, role) => {
	//switch role and broadcast to all players
    console.log("-  switchRole  - ", socket.id);
    console.log("*" + playerName + " *" + role)
    lobby.switchUserRole(playerName, role);
  }

  const setOwner = (playerName) => {
    console.log("-  setOwner  - ", socket.id);
    console.log("*" + playerName)
	  lobby.setOwner(playerName, false);
  }

  socket.on(event.SIGNAL + event.LOBBY, (action) => {

    switch (action.type) {
      case event.TYPE + event.T_SWITCH_ROLE :
        switchRole(action.name, action.role)
        break;
      case event.TYPE + event.T_SET_OWNER :
        setOwner(action.name)
        break;
      case event.TYPE + event.T_GET_USERS :
        getPlayers()
        break;
      case event.TYPE + event.T_GAME_START :
        gameStart(action.id)
        break;
    }
  })

}

export const unsubLobby = (socket) => {
    console.log("-  unsubLobby  - ", socket.id);
    socket.removeAllListeners(event.SIGNAL + event.LOBBY);
}

// event.MOVE_LEFT
// event.MOVE_RIGHT
// event.ROTATE_RIGHT
// event.SOFT_DROP
// event.HARD_DROP
// event.GAME_END sending gameEnd

export const subGame = (socket, game, playerid) => {
  const moveLeft = () => {
    game.getPlayer(playerid).board.playerAction(event.T_LEFT_ARROW);
  };
  const moveRight = () => {
    game.getPlayer(playerid).board.playerAction(event.T_RIGHT_ARROW);
  };
  const rotateRight = () => {
    game.getPlayer(playerid).board.playerAction(event.T_UP_ARROW);
  };
  const softDrop = () => {
    if (game.getPlayer(playerid).board.playerAction(event.T_DOWN_ARROW))
      game.resetGameTick(playerid);
  };
  const hardDrop = () => {
    game.getPlayer(playerid).board.playerAction(event.T_SPACE);
    game.resetGameTick(playerid);
  };

  game.setGameEvents({
    moveLeft : moveLeft,
    moveRight : moveRight,
    rotateRight : rotateRight,
    softDrop : softDrop,
    hardDrop : hardDrop,
  })

  socket.on(event.SIGNAL + event.GAME, (action) => {
    switch (action.type) {
      case event.TYPE + event.T_LEFT_ARROW :
        moveLeft()
        break;
      case event.TYPE + event.T_RIGHT_ARROW :
        moveRight()
        break;
      case event.TYPE + event.T_UP_ARROW :
        rotateRight()
        break;
      case event.TYPE + event.T_DOWN_ARROW :
        softDrop()
        break;
      case event.TYPE + event.T_SPACE :
        hardDrop()
        break;
    }
  })
}

export const unsubGame = (socket) => {
  console.log("-  unsubGame  - ", socket.id);
	socket.removeAllListeners(event.SIGNAL + event.GAME);
}