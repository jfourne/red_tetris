import {subInitPlayer, subMainLobby, unsubLeaveLobby, unsubMainLobby} from '../socket/eventHandler'
import {LEAVE_ROOM} from '../config/config_socket'


import Lobby from './Lobby'
import {MAX_LOBBYS} from '../config/config_game'
import Player from './Player';

class LobbyManager {
  constructor() {
    this._mainLobby = [];
    this._lobbys = new Array(MAX_LOBBYS).fill(undefined);
    this._lobbys.forEach((lobby, index, arr) => {
      arr[index] = {
        id: index,
        available: true,
        lobby: undefined
      }
    })
  }

  getLobbies() {
	  return this._lobbys;
  }

  findPlayer(socket) {
    return this._mainLobby.find( (player) => {
      return socket === player.getSocket();
    });
  }

  joinMainLobby(newPlayer, leftRoom) {
    if (leftRoom) {
		unsubLeaveLobby(newPlayer.getSocket());
	  this._mainLobby.push(newPlayer);
      subMainLobby(newPlayer.getSocket(), this, newPlayer);
    }
    else {
      subInitPlayer(newPlayer.getSocket(), newPlayer, this);
    }
    console.log(newPlayer.getSocket().id + " joinMainLobby");
  }

  leaveMainLobby(socket) {
    const player = this._mainLobby.find((player) => {
      return player.getSocket().id === socket.id;
    })

    if (player) {
	  unsubMainLobby(player.getSocket());
      this._mainLobby = this._mainLobby.filter( (p) => {
		if (p !== player)
			return p;
      })
    }
    else {
      console.log("Error, socket " + socket.id + " (leaveMainLobby) : is not found in mainLobby ")
    }
	console.log(socket.id + " leaveMainLobby")
  }

  reqNewLobby(player) {
    const foundLobby = this._lobbys.find((lobby) => {
      return lobby.available;
	  })
	  console.log(foundLobby);
    if (foundLobby === undefined)
      return undefined;
    foundLobby.available = false;
    if (foundLobby.lobby === undefined)
      foundLobby.lobby = new Lobby(foundLobby.id, player, this);
    else
      foundLobby.lobby.init(player);
    console.log("returned requested lobby : " + player.getSocket().id)
    return foundLobby;
  }

  getLobby(id) {
    if (id >= 0 && id < MAX_LOBBYS) {
      if (this._lobbys[id].lobby != undefined) {
        return this._lobbys[id].lobby;
      }
    }
    return undefined
  }

  deleteLobby(id) {
    const foundLobby = this._lobbys.find((lobby) => {
      return lobby.id === id;
    })
    if (foundLobby === undefined)
    {
      console.log("did not found and delete lobby : " + id)
      return ;
    }
    console.log("deleting lobby : " + foundLobby.id)
	foundLobby.available = true;
	delete foundLobby.lobby;
	foundLobby.lobby = undefined;
  }


  // Lobby and not LobbyManager should handle this
  startGame(socket) {
    this._lobbys.forEach((lobby) => {
      if (lobby.available === false && lobby.game !== undefined)
      {
        console.log("Game")
        if (lobby.game._players[lobby.game._owner] === socket.id)
          lobby.game.startGame();
      }
    })
  }

  subscribeToEvents(socket) {

  }

  unsubscribeToEvents(socket) {

  }
}

export default LobbyManager