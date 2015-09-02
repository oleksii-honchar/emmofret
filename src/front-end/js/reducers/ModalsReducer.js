import { handleActions } from 'redux-actions'
import _ from 'lodash'
import constants from '../constants.js'
const { SHOW_MODAL, HIDE_MODAL, SHAKE_MODAL_START, SHAKE_MODAL_STOP } = constants.modal

const initialState = {
  login: {
    name: 'login',
    isOpen: false,
    isShaking: false,
    shakeStyle: null
  },
  'sign-up': {
    name: 'sign-up',
    isOpen: false,
    isShaking: false,
    shakeStyle: null
  }
}
//const initialState = {
//  login: {
//    name: 'login',
//    isOpen: false,
//    isShaking: false,
//    shakeStyle: null
//  },
//  'sign-up': {
//    name: 'sign-up',
//    isOpen: false,
//    isShaking: false,
//    shakeStyle: null
//  }
//}

function hide (state, action) {
  const modal = _.extend({}, state[action.payload], { isOpen: false })
  state[action.payload] = modal
  return state
}

function startShake (state, action) {
  const modal = _.merge({}, state[action.payload], {
    isShaking: true,
    shakeStyle: 'horizontal'
  })

  state[action.payload] = modal
  return state
}

function stopShake (state, action) {
  const modal = _.merge({}, state[action.payload], {
    isShaking: false,
    shakeStyle: 'horizontal'
  })

  state[action.payload] = modal
  return state
}

function show (state, action) {
  $.notifyClose()
  const modal = _.extend({}, state[action.payload], { isOpen: true })
  state[action.payload] = modal
  return state
}

export default handleActions({
  SHOW_MODAL: show,
  HIDE_MODAL: hide,
  SHAKE_MODAL_START: startShake,
  SHAKE_MODAL_STOP: stopShake,
}, initialState)

