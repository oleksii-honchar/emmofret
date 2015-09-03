import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from './reducers'
//import apiMiddleware from '../middleware/api'

let combinedCreateStore
//if (__DEVTOOLS__) {
//  const { devTools } = require('redux-devtools')
//  combinedCreateStore = compose(devTools(), createStore)
//} else {
//  combinedCreateStore = compose(createStore)
//}
combinedCreateStore = compose(createStore)

const logger = createLogger({
  level: 'error',
  collapsed: true,
  //predicate: (getState, action) => action.type !== AUTH_REMOVE_TOKEN
})

const finalCreateStore = applyMiddleware(
  thunk,
  //apiMiddleware,
  logger
)(combinedCreateStore)

let AppStore = finalCreateStore(rootReducer)
window.AppStore = AppStore
export default AppStore
