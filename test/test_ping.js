import chai from "chai"
import {startServer, configureStore} from './helpers/server'
import rootReducer from '../src/client/reducers'
import {ping} from '../src/client/actions/server'
import io from 'socket.io-client'
import params from '../params'

chai.should()

const test_ping_MiddleWare = socket => ({dispatch, getState}) => {
  return next => action => {
    if (socket && action.type) {
      switch (action.type) {
        case 'server/ping':
          socket.on('action', (action) => dispatch(action))
          socket.emit('action', action)
          break
      }
    }
    return next(action)
  }
}

describe('ping test', function(){
  let tetrisServer
  before(cb => startServer( params.server, function(err, server){
    tetrisServer = server
    cb()
  }))

  after(function(done){tetrisServer.stop(done)})

  it('should pong', function(done){
    const initialState = {}
    const socket = io(params.server.url)
    const store =  configureStore(rootReducer, socket, initialState, {
      'pong': () =>  done()
    }, test_ping_MiddleWare)
    store.dispatch(ping())
  });

});
