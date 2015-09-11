import notify from '../helpers/notify.js'
import request from 'superagent'
import _ from 'lodash'
import { createAction } from 'redux-actions'
import constants from '../constants.js'
import 'isomorphic-fetch'

import * as ModalActions from '../actions/ModalActions.js'

const {
        LOG_IN, LOG_OUT, SIGN_UP,
        REMEMBER_TRANSITION, FULFILL_TRANSITION,
        REMEMBER_ROUTER, TRANSITION_TO_HOME, DISCARD_NEXT_TRANSITION, FETCH_APP_STATE
      } = constants.application

function logIn (user) {
  return {
    type: LOG_IN,
    payload: user
  }
}

function makeLogInRequest (credentials) {
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
        
        const nextPath= getState().application.nextTransitionPath
        if (nextPath) {
          dispatch(fulfillTransition(nextPath))
        }
      })
  }
}

function logOut () {
  return { type: LOG_OUT }
}

function makeLogOutRequest () {
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

function makeSignUpRequest (data) {
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

function fulfillTransition (nextPath) {
  return {
    type: FULFILL_TRANSITION,
    payload: nextPath
  }
}

function rememberTransition (nextPath) {
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

function fetchState () {
  return {
    type: FETCH_APP_STATE,
    payload: '/users/current'
  }
}

module.exports = {
  logIn: makeLogInRequest,
  logOut: makeLogOutRequest,
  rememberRouter: createAction(REMEMBER_ROUTER),
  signUp: makeSignUpRequest,
  requestAuth: requestAuth,
  fulfillTransition: fulfillTransition,
  discardNextTransition: createAction(DISCARD_NEXT_TRANSITION),
  fetchState: fetchState
}