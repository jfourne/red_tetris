import eventHandler from './eventHandler'
import * as event from '../config/config_socket'
import LobbyManager from '../models/LobbyManager'
import Player from '../models/Player'

const lm = new LobbyManager()

const initEngine = io => {
  io.on(event.CONNECT, function(socket){
    console.log("Socket connected: " + socket.id)
    socket.on('action', (action) => {
      if(action.type === 'server/ping'){
        socket.emit('action', {type: 'pong'})
      }
    })
    const player = new Player(socket);
    lm.joinMainLobby(player, false)
    // lm.leaveMainLobby(socket)
    // eventHandler(socket, lm);
  })
}

export default initEngine