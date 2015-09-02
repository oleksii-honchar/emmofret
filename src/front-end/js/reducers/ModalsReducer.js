import { handleActions } from 'redux-actions'
import _ from 'lodash'
import constants from '../constants.js'
const { SHOW_MODAL, HIDE_MODAL, SHAKE_MODAL } = constants.modal

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


function hide (state, action) {
  return _.map(state, (modal) => {
    if (modal.name === action.payload) {
      return _.extend({}, modal, { isOpen: false })
    } else {
      return modal
    }
  })
}

function shake (state, action) {
  $.notifyClose()
  console.log('[ModalReducer] shake() pending')
  return Object.assign({}, state)
}

function show (state, action) {
  $.notifyClose()
  return _.map(state, (modal) => {
    if (modal.name === action.payload) {
      return _.extend({}, modal, { isOpen: true })
    } else if (modal.isOpen) {
      return _.extend({}, modal, { isOpen: false})
    } else {
      return modal
    }
  })
}

export default handleActions({
  SHOW_MODAL: show,
  HIDE_MODAL: hide,
  SHAKE_MODAL: shake
}, initialState)

