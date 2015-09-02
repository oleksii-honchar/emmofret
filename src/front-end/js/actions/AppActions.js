import notify from '../helpers/notify.js'
import request from 'superagent'
import _ from 'lodash'
import { createAction } from 'redux-actions'
import constants from '../constants.js'

import * as ModalActions from '../actions/ModalActions.js'

const { LOG_IN, LOG_OUT, SIGN_UP } = constants.application

function logIn (user) {
  return {
    type: LOG_IN,
    payload: user
  }
}

function logInRequest (credentials) {
  return (dispatch, getState) => {
    request.post('/api/users/log-in')
      .set('Content-Type', 'application/json')
      .send(_.pick(credentials, ['email', 'password']))
      .end((err, res) => {
        if (err) {
          if (err.status !== 401) { notify.error(err) }
          return dispatch(ModalActions.shake('login'))
        }

        dispatch(ModalActions.hide('login'))
        dispatch(logIn(res.body))
      })
  }
}

function signUp (user) {
  return {
    type: SIGN_UP,
    payload: user
  }
}

function signUpRequest () {
  return {
    type: SIGN_UP,
    payload: user
  }
}


module.exports = {
  logIn: logInRequest,
  logOut: createAction(LOG_OUT),
  signUp: signUpRequest
}
