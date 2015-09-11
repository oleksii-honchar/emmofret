import _ from 'lodash'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunkMdlwr from 'redux-thunk'
import promiseMdlwr from 'redux-promise'
import apiMdlwr from './middleware/apiMdlwr.js'
import createRootReducer from './reducers'

let combinedCreateStore
//if (_.result(process.env, 'NODE_ENV') == 'development') {
//  const { devTools } = require('redux-devtools')
//  combinedCreateStore = compose(devTools(), createStore)
//} else {
//  combinedCreateStore = compose(createStore)
//}
combinedCreateStore = compose(createStore)

let finalCreateStore = null
if (__CLIENT__ && __DEVELOPMENT__) {
  const createLogger = require('redux-logger')
  const logger = createLogger({
    level: 'error',
    collapsed: true
  })

  finalCreateStore = applyMiddleware(
    apiMdlwr,
    thunkMdlwr,
    promiseMdlwr,
    logger
  )(combinedCreateStore)
} else {
  finalCreateStore = applyMiddleware(
    apiMdlwr,
    thunkMdlwr,
    promiseMdlwr
  )(combinedCreateStore)
}


export default () => {
  const rootReducer = createRootReducer()
  let AppStore = finalCreateStore(rootReducer)

  if (__CLIENT__ && __DEVELOPMENT__) {
    window.AppStore = AppStore
  }

  return AppStore
}
