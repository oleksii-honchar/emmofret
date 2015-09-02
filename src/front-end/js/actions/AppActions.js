import notify from '../helpers/notify.js'
import request from 'superagent'
import _ from 'lodash'
import { createAction } from 'redux-actions'
import constants from '../constants.js'

import * as ModalActions from '../actions/ModalActions.js'

const { LOG_IN, LOG_OUT, SIGN_UP } = constants.application

function logIn(user) {
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
          //return shakeLogin()
        }

        notify.success('User successfully logged in')
        dispatch(ModalActions.hide('login'))
        dispatch(logIn(res.body))
      })
  }
}

module.exports = {
  logIn: logInRequest,
  logOut: createAction(LOG_OUT),
  //signUp: createAction(SIGN_UP)
}
