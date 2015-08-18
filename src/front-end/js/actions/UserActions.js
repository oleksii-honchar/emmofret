import Dispatcher from '../dispatcher.js'
import UserConstants from '../constants/UserConstants.js'
import ModalConstants from '../constants/ModalConstants.js'
import MeConstants from '../constants/MeConstants.js'
import notify from '../helpers/notify.js'
import request from 'superagent'
import _ from 'lodash'

function hideLogin () {
  Dispatcher.dispatch({
    actionType: ModalConstants.HIDE_MODAL,
    data: 'login'
  })
}

function hideSignUp () {
  Dispatcher.dispatch({
    actionType: ModalConstants.HIDE_MODAL,
    data: 'sign-up'
  })
}

function shakeLogin () {
  Dispatcher.dispatch({
    actionType: ModalConstants.SHAKE_MODAL,
    data: 'login'
  })
}


function logIn (data) {
  request.post('/api/users/log-in')
    .set('Content-Type', 'application/json')
    .send(_.pick(data, ['email', 'password']))
    .end((err, res) => {
      if (err) {
        if(err.status !== 401) { notify.error(err) }
        return shakeLogin()
      }

      notify.success('User successfully logged in')
      hideLogin()

      Dispatcher.dispatch({
        actionType: MeConstants.SET_TOKEN,
        data: res.body.token
      })

      Dispatcher.dispatch({ actionType: MeConstants.FETCH_CURRENT })
    })
}

function logOut () {
  request.post('/api/users/log-out')
    .set('Content-Type', 'application/json')
    .end((err, res) => {
      if (err) { return notify.error(err) }
      notify.success('User successfully logged out')
      Dispatcher.dispatch({ actionType: MeConstants.LOG_OUT })
    })
}

function signUp(data) {
  request.post('/api/users/register')
    .set('Content-Type', 'application/json')
    .send(_.pick(data, ['firstName', 'lastName', 'email', 'password']))
    .end((err, res) => {
      if (err) { return notify.error(res.body) }

      notify.success('User successfully registered. Now you can log in.')
      hideSignUp()
    })
}

export default {
  logIn: logIn,
  logOut: logOut,
  signUp: signUp
}