import { combineReducers } from 'redux'
import createAppReducer from './AppReducer'
import modals from './ModalsReducer'

export default () => {
  return combineReducers({
    application: createAppReducer(),
    modals
  })
}
