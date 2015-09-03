import notify from '../helpers/notify.js'
import request from 'superagent'
import _ from 'lodash'
import { createAction } from 'redux-actions'
import constants from '../constants.js'

import * as ModalActions from '../actions/ModalActions.js'

const {
        LOG_IN, LOG_OUT, SIGN_UP,
        REMEMBER_TRANSITION, FULFILL_TRANSITION
      } = constants.application

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

function logOut () {
  return { type: LOG_OUT }
}

function logOutRequest () {
  return (dispatch) => {
    request.post('/api/users/log-out')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (err) { return notify.error(err) }

        dispatch(logOut())
      })
  }
}

function signUp () {
  return { type: SIGN_UP }
}

function signUpRequest (data) {
  return (dispatch) => {
    request.post('/api/users/register')
      .send(_.pick(data, ['firstName', 'lastName', 'email', 'password']))
      .end((err, res) => {
        if (err) {
          notify.error(res.body)
          return dispatch(ModalActions.shake('sign-up'))
        }

        dispatch(ModalActions.hide('sign-up'))
        dispatch(signUp())
      })
  }
}

function rememberTransition(nextPath) {
  return {
    type: REMEMBER_TRANSITION,
    payload: nextPath
  }
}

function requestAuth (nextPath) {
  return (dispatch) => {
    dispatch(rememberTransition(nextPath))
    dispatch(ModalActions.show('login'))
  }
}


module.exports = {
  logIn: logInRequest,
  logOut: logOutRequest,
  signUp: signUpRequest,
  requestAuth: requestAuth
}