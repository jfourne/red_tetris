import chai from "chai"
import {startServer, configureStore} from './helpers/server'
import rootReducer from '../src/client/reducers'
import {servInitPLayer} from '../src/client/actions/server'
import io from 'socket.io-client'
import params from '../params'

import Player from '../src/server/models/Player'
import fakeSocket from './helpers/server'

import * as event from '../src/server/config/config_socket'

chai.should()

const test_initPlayer_MiddleWare = socket => ({dispatch, getState}) => {
  return next => action => {
    if (socket && action.type) {
      switch (action.type) {
        case event.TYPE + event.INIT_PLAYER:
          socket.on(event.INIT_PLAYER, (action) => dispatch(action))
          socket.emit(event.SIGNAL + event.INIT_PLAYER, action)
          break
      }
    }
    return next(action)
  }
}

export const test_initPlayer = (done, socket, name) => {

  const initialState = {}
  const store =  configureStore(rootReducer, socket, initialState, {
    'initPlayer': () =>  done()
  }, test_initPlayer_MiddleWare)
  store.dispatch(servInitPLayer(name))
}

describe('-----initPlayer test-----', function(){
  let tetrisServer
  before(cb => startServer( params.server, function(err, server){
    tetrisServer = server
    cb()
  }))

  after(function(done){tetrisServer.stop(done)})

  it('should initPlayer', function(done){
    const socket = io(params.server.url)
    test_initPlayer(done, socket, "initPlayer1")
  });

});