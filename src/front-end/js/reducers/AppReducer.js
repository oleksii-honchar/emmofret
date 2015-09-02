import notify from '../helpers/notify.js'
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

function logIn (state, action) {
  notify.success('User successfully logged in')

  let newState = _.merge({}, state)
  newState.token = action.payload.token
  newState.user = _.omit(action.payload, 'token')
  window.sessionStorage.application = JSON.stringify(newState)
  return newState
}

function logOut (state) {
  notify.success('User successfully logged out')
  let newState = _.merge({}, state)
  newState.token = null
  newState.user = null
  delete window.sessionStorage.application
  return newState
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

//function hideLogin () {
//  Dispatcher.dispatch({
//    actionType: ModalConstants.HIDE_MODAL,
//    data: 'login'
//  })
//}
//
//function hideSignUp () {
//  Dispatcher.dispatch({
//    actionType: ModalConstants.HIDE_MODAL,
//    data: 'sign-up'
//  })
//}
//
//function shakeLogin () {
//  Dispatcher.dispatch({
//    actionType: ModalConstants.SHAKE_MODAL,
//    data: 'login'
//  })
//}

//function logIn (data) {
//  request.post('/api/users/log-in')
//    .set('Content-Type', 'application/json')
//    .send(_.pick(data, ['email', 'password']))
//    .end((err, res) => {
//      if (err) {
//        if (err.status !== 401) { notify.error(err) }
//        return shakeLogin()
//      }
//
//      notify.success('User successfully logged in')
//      hideLogin()
//
//      Dispatcher.dispatch({
//        actionType: UserConstants.LOG_IN,
//        data: res.body.token
//      })
//
//      Dispatcher.dispatch({ actionType: UserConstants.FETCH_CURRENT })
//    })
//}
//
//function logOut () {
//  request.post('/api/users/log-out')
//    .set('Content-Type', 'application/json')
//    .end((err, res) => {
//      if (err) { return notify.error(err) }
//      notify.success('User successfully logged out')
//      Dispatcher.dispatch({ actionType: UserConstants.LOG_OUT })
//    })
//}
//
//function signUp (data) {
//  request.post('/api/users/register')
//    .set('Content-Type', 'application/json')
//    .send(_.pick(data, ['firstName', 'lastName', 'email', 'password']))
//    .end((err, res) => {
//      if (err) { return notify.error(res.body) }
//
//      notify.success('User successfully registered. Now you can log in.')
//      hideSignUp()
//    })
//}

