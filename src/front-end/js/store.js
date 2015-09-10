import _ from 'lodash'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

let isDevelopment = process.env.NODE_ENV === 'development'

let combinedCreateStore
//if (_.result(process.env, 'NODE_ENV') == 'development') {
//  const { devTools } = require('redux-devtools')
//  combinedCreateStore = compose(devTools(), createStore)
//} else {
//  combinedCreateStore = compose(createStore)
//}
combinedCreateStore = compose(createStore)

let finalCreateStore = null
if (isDevelopment) {
  const createLogger = require('redux-logger')
  const logger = createLogger({
    level: 'error',
    collapsed: true
  })

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

if (isDevelopment) {
  try {
    window.AppStore = AppStore
  }
  catch (e) {}
}

export default AppStore
