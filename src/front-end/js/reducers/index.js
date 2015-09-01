import { combineReducers } from 'redux'
import application from './AppReducer'
import modals from './ModalsReducer'

const rootReducer = combineReducers({
  application,
  modals
})

export default rootReducer
