import Router from 'react-router'
import { handleActions } from 'redux-actions'
import notify from '../helpers/notify.js'
import _ from 'lodash'
import cookie from 'js-cookie'

import constants from '../constants.js'

const { GOTO_INDEX, GOTO_LOGIN, LOG_IN, LOG_OUT, SIGN_UP, REMEMBER_TRANSITION,
        FETCH_APP_STATE
      } = constants.application

function logIn (state, action) {
  notify.success('User successfully logged in')

  let newState = _.merge({}, state)
  newState.isLoggedIn = true
  newState.token = action.payload.token
  newState.user = _.omit(action.payload, 'token')

  cookie.set('token', newState.token, { expire: 3 })

  return newState
}

function logOut (state) {
  notify.success('User successfully logged out')
  let newState = _.merge({}, state)
  newState.isLoggedIn = false
  newState.token = null
  newState.user = null
  cookie.remove('token')
  state.router.transitionTo('/app/dashboard')
  return newState
}

function rememberTransition (state, action) {
  return _.merge({}, state, { nextTransitionPath: action.payload })
}

function fulfillTransition (state, action) {
  state.router.transitionTo(state.nextTransitionPath)
  return _.merge({}, state, { nextTransitionPath: null })
}

function discardNextTransition (state, action) {
  return _.merge({}, state, { nextTransitionPath: null })
}

function rememberRouter (state, action) {
  return _.merge({}, state, {router: action.payload})
}

function signUp (state) {
  notify.success('User successfully registered. Now you can log in.')
  return Object.assign({}, state)
}

function fetchStateRequest (state, action) {
  return Object.assign({}, state)
}

function fetchStateSuccess (state, action) {
  let newState = _.merge({}, state)
  newState.isLoggedIn = true
  newState.token = action.payload.token
  newState.user = _.omit(action.payload, 'token')
  return newState
}

function fetchStateError (state, action) {
  notify.error(action.payload)
  return state
}

export function isFetched (store) {
  const state = store.application
  if (state.isLoggedIn) {
    return _.keys(state.user).length > 0 && state.user.firstName
  } else {
    return true
  }
}

function gotoIndex (state, action) {
  const transition = action.payload
  const path = '/app/dashboard'

  if (transition) {
    transition.to(path)
  } else {
    state.router.transitionTo(path)
  }

  return state
}

function gotoLogin (state, action) {
  const transition = action.payload
  const path = '/app/login'

  if (transition) {
    transition.to(path)
  } else {
    state.router.transitionTo(path)
  }

  return state
}

export default () => {
  let data = {}
  if (__CLIENT__) {
    data = _.result(window, 'INITIAL_STATE.application')
  } else {
    data = JSON.parse(INITIAL_STATE).application
  }

  const initialState = _.defaultsDeep(data, {
    isLoggedIn: _.isString(data.token),
    token: null,
    user: null,
    nextTransitionPath : null,
    router : null
  })

  return handleActions({
    GOTO_INDEX: gotoIndex,
    GOTO_LOGIN: gotoLogin,
    LOG_IN: logIn,
    LOG_OUT: logOut,
    SIGN_UP: signUp,
    REMEMBER_TRANSITION: rememberTransition,
    FULFILL_TRANSITION: fulfillTransition,
    DISCARD_NEXT_TRANSITION: discardNextTransition,
    REMEMBER_ROUTER: rememberRouter,
    [FETCH_APP_STATE.REQUEST]: fetchStateRequest,
    [FETCH_APP_STATE.SUCCESS]: fetchStateSuccess,
    [FETCH_APP_STATE.ERROR]: fetchStateError,
  }, initialState)
}
