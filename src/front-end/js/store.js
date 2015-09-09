import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

let isServerSide = typeof window === 'undefined'

let logger = null
if (!isServerSide) {
  let createLogger = require('redux-logger')
  logger = createLogger({
    level: 'error',
    collapsed: true
  })
}

let window = window || global

let combinedCreateStore
//if (__DEVTOOLS__) {
//  const { devTools } = require('redux-devtools')
//  combinedCreateStore = compose(devTools(), createStore)
//} else {
//  combinedCreateStore = compose(createStore)
//}
combinedCreateStore = compose(createStore)

let finalCreateStore = null
if (!isServerSide) {
  finalCreateStore = applyMiddleware(
    thunk,
    logger
  )(combinedCreateStore)
} else {
  finalCreateStore = applyMiddleware(
    thunk
  )(combinedCreateStore)
}

let AppStore = finalCreateStore(rootReducer)
window.AppStore = AppStore
export default AppStore
