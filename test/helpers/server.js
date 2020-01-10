import * as server from '../../src/server/index'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

export const startServer = (params, cb) => {
  server.create(params)
    .then( server => cb(null, server) )
    .catch( err => cb(err) )
}

export const configureStore = (reducer, socket, initialState, types, middleWare) => createStore( 
  reducer, 
  initialState, 
  applyMiddleware(
    myMiddleware(types),
    middleWare(socket),
    // socketIoMiddleWare(socket),
    thunk
  )
)

const isFunction = arg => { return typeof arg === 'function' }

const myMiddleware = (types={}) => {
  const fired = {}
  return store => next => action => {
    const result = next(action)
    const cb = types[action.type]    
    if(cb && !fired[action.type]){
      if(!isFunction(cb)) throw new Error("action's type value must be a function")
      fired[action.type] = true
      cb({getState: store.getState, dispatch: store.dispatch, action})
    }
    return result
  }
}

export const fakeSocket = (id, fakeOn, fakeEmit) => {
  return {
    id: id,
    on: fakeOn,
    emit: fakeEmit,
  }
}
