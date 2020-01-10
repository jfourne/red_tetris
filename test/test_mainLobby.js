import chai from "chai"
import {startServer, configureStore} from './helpers/server'
import rootReducer from '../src/client/reducers'
import {servCreateLobby, servJoinLobby, servGetLobbies} from '../src/client/actions/server'
import io from 'socket.io-client'
import params from '../params'

import {test_initPlayer} from './test_initPlayer'
import * as event from '../src/server/config/config_socket'

chai.should()

const test_mainLobby_MiddleWare = socket => ({dispatch, getState}) => {
  return next => action => {
    if (socket && action.type) {
      switch (action.type) {
        case event.TYPE + event.T_CREATE_LOBBY:
          socket.on(event.LOBBY, (action) => {dispatch(action)})
          socket.emit(event.SIGNAL + event.MAINLOBBY, action)
          break
        case event.TYPE + event.T_JOIN_LOBBY:
          socket.on(event.LOBBY, (action) => {dispatch(action)})
          socket.emit(event.SIGNAL + event.MAINLOBBY, action)
          break
        case event.TYPE + event.T_GET_LOBBIES:
          socket.on(event.GETLOBBIES, (action) => {dispatch(action)})
          socket.emit(event.SIGNAL + event.MAINLOBBY, action)
          break
      }
    }
    return next(action)
  }
}

export const test_createLobby = (done, socket) => {
  const initialState = {}
  const store =  configureStore(rootReducer, socket, initialState, { 
    'createLobby': () =>  done()
  }, test_mainLobby_MiddleWare)
  store.dispatch(servCreateLobby())
}

export const test_joinLobby = (done, socket, socketLobby, nameLobby, roomID) => {
  const initialState = {}
  const store =  configureStore(rootReducer, socket, initialState, { 
    'createLobby': () => done()
  }, test_mainLobby_MiddleWare) 
  store.dispatch(servJoinLobby(roomID, "(" + socketLobby.id.substring(0, 4) + ")" + nameLobby))
}

export const test_getLobbies = (done, socket) => {
  const initialState = {}
  const store =  configureStore(rootReducer, socket, initialState, { 
    'getLobbies': () =>  done()
  }, test_mainLobby_MiddleWare)
  store.dispatch(servGetLobbies())
}

describe('-----createLobby test-----', function(){
  let tetrisServer

  before(cb => startServer( params.server, function(err, server){
    tetrisServer = server
    cb()
  }))

  after(function(done){tetrisServer.stop(done)})

  it('should createLobby', function(done){
    const socket = io(params.server.url)
    var promise =  new Promise ((resolve, reject) => {
      test_initPlayer(resolve, socket, "createLobbyPlayer")
    })
    promise.then(() => {
      test_createLobby(done, socket)
    })
  });

  it('should joinLobby', function(done){
    const socket1 = io(params.server.url)
    const socket2 = io(params.server.url)

    var promise1 =  new Promise ((resolve, reject) => {
      test_initPlayer(resolve, socket1, "joinLobbyPlayer1")
    })
    var promise2 =  new Promise ((resolve, reject) => {
      test_initPlayer(resolve, socket2, "joinLobbyPlayer2")
    })
    var promise3 =  new Promise ((resolve, reject) => {
      test_createLobby(resolve, socket1)
    })
    promise1.then(() => {
    promise2.then(() => {
    promise3.then(() => {
      test_joinLobby(done, socket2, socket1, "joinLobbyPlayer1", 1);
    })})})
  });

  it('should getLobby', function(done){
    const socket = io(params.server.url)
    var promise =  new Promise ((resolve, reject) => {
      test_initPlayer(resolve, socket, "getLobbyPlayer1")
    })
    promise.then(() => {
      test_getLobbies(done, socket)
    })
  });

});