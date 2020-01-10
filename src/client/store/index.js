import { createStore, applyMiddleware } from 'redux'
import reducer from '../reducers'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import {storeStateMiddleWare} from '../middleware/storeStateMiddleWare'

const initialState = {}

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(thunk, createLogger())
)

export default store;