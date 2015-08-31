import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMdlwr from 'redux-thunk'
//import apiMiddleware from '../middleware/api'
import createLogger from 'redux-logger'
import * as reducers from '../reducers'
//import { routerStateReducer as router } from 'redux-react-router'

const reducer = combineReducers(reducers)

const loggerMdlwr = createLogger({
  level: 'error',
  collapsed: true,
  //predicate: (getState, action) => action.type !== AUTH_REMOVE_TOKEN
});

const createStoreWithMiddleware = applyMiddleware(
  thunkMdlwr,
  //apiMiddleware,
  loggerMdlwr
)(createStore)

function configureStore(initialState) {
  return createStoreWithMiddleware(reducer, initialState)
}

let AppStore = configureStore()

export default AppStore
