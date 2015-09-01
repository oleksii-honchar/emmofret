import { handleActions } from 'redux-actions'
import constants from '../constants.js'
const { LOG_IN, LOG_OUT, SIGN_UP } = constants.application

let data
if (_.has(window.sessionStorage, 'application')) {
  try {
    data = JSON.parse(window.sessionStorage.application)
  } catch (e) {
    delete window.sessionStorage.application
  }
}

const initialState = data || {
  token: null,
  user: null
}

function logIn (state) {
  console.log('[AppReducer] logIn() pending')
  return Object.assign({}, state)
}

function logOut (state) {
  console.log('[AppReducer] logOut() pending')
  return Object.assign({}, state)
}

function signUp (state) {
  console.log('[AppReducer] signUp() pending')
  return Object.assign({}, state)
}

export default handleActions({
  LOG_IN: logIn,
  LOG_OUT: logOut,
  SIGN_UP: signUp
}, initialState)