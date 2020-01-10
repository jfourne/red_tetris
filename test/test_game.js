import chai from "chai"
import {startServer, configureStore} from './helpers/server'
import rootReducer from '../src/client/reducers'
import {leftArrow, rightArrow, upArrow, downArrow, space} from '../src/client/actions/server'
import io from 'socket.io-client'
import params from '../params'

import {test_initPlayer} from './test_initPlayer'
import {test_createLobby, test_joinLobby} from './test_mainLobby'
import {test_startGame} from './test_lobby'
import * as event from '../src/server/config/config_socket'

chai.should()

const test_Game_MiddleWare = socket => ({dispatch, getState}) => {
  return next => action => {
    if (socket && action.type) {
      switch (action.type) {
        case event.TYPE + event.T_LEFT_ARROW:
          socket.on(event.GAME, (action) => {dispatch(action)})
          socket.emit(event.SIGNAL + event.GAME, action)
          break
        case event.TYPE + event.T_RIGHT_ARROW:
          socket.on(event.GAME, (action) => {dispatch(action)})
          socket.emit(event.SIGNAL + event.GAME, action)
          break
        case event.TYPE + event.T_UP_ARROW:
          socket.on(event.GAME, (action) => {dispatch(action)})
          socket.emit(event.SIGNAL + event.GAME, action)
          break
        case event.TYPE + event.T_DOWN_ARROW:
          socket.on(event.GAME, (action) => {dispatch(action)})
          socket.emit(event.SIGNAL + event.GAME, action)
          break
        case event.TYPE + event.T_SPACE:
            socket.on(event.GAME, (action) => {dispatch(action)})
            socket.emit(event.SIGNAL + event.GAME, action)
            break
      }
    }
    return next(action)
  }
}

export const test_moveLeft = (done, socket) => {
  const initialState = {}
  const store =  configureStore(rootReducer, socket, initialState, { 
    'board': () =>  done()
  }, test_Game_MiddleWare)
  store.dispatch(leftArrow())
}

export const test_moveRight = (done, socket) => {
  const initialState = {}
  const store =  configureStore(rootReducer, socket, initialState, { 
    'switchRole': () => done()
  }, test_Game_MiddleWare) 
  store.dispatch(rightArrow())
}

export const test_rotate = (done, socket) => {
  const initialState = {}
  const store =  configureStore(rootReducer, socket, initialState, { 
    'setOwner': () =>  done()
  }, test_Game_MiddleWare)
  store.dispatch(upArrow())
}

export const test_softDrop = (done, socket) => {
  const initialState = {}
  const store =  configureStore(rootReducer, socket, initialState, { 
    'gameStart': () =>  done()
  }, test_Game_MiddleWare)
  store.dispatch(downArrow())
}

export const test_hardDrop = (done, socket) => {
  const initialState = {}
  const store =  configureStore(rootReducer, socket, initialState, { 
    'gameStart': () =>  done()
  }, test_Game_MiddleWare)
  store.dispatch(space())
}

describe('-----Game Test-----', function(){
  let tetrisServer
  let socket1, socket2

  before(cb => startServer( params.server, function(err, server){
    tetrisServer = server

    socket1 = io(params.server.url)
    socket1.on("connect", () => {
      socket2 = io(params.server.url)
      socket2.on("connect", () => {
        var promise1 =  new Promise ((resolve, reject) => {
          test_initPlayer(resolve, socket1, "player1")
        }).then(() => {
        var promise2 =  new Promise ((resolve, reject) => {
          test_initPlayer(resolve, socket2, "player2")
        }).then(() => {
        var promise3 =  new Promise ((resolve, reject) => {
          test_createLobby(resolve, socket1)
        }).then(() => {
          var promise4 =  new Promise ((resolve, reject) => {
            // test_startGame(resolve, socket1, 0);
            resolve()
          }).then(() => {cb()})
        })})})
      })
    })
  }))

  after(function(done){tetrisServer.stop(done)})

  // it('should Play', function(done){
    // var promise1 =  new Promise ((resolve, reject) => {
    //   test_moveLeft(resolve, socket1)
    // }).then(() => {
    // var promise2 =  new Promise ((resolve, reject) => {
    //   test_moveLeft(resolve, socket1)
    // }).then(() => {
    // var promise3 =  new Promise ((resolve, reject) => {
    //   test_moveRight(resolve, socket1)
    // }).then(() => {
    // var promise4 =  new Promise ((resolve, reject) => {
    //   test_rotate(resolve, socket1)
    // }).then(() => {
    // var promise5 =  new Promise ((resolve, reject) => {
    //   test_softDrop(resolve, socket1)
    // }).then(() => {
    //   test_hardDrop(done, socket1)
    // })})})})})
  // });

});