import { handleActions } from 'redux-actions'
import _ from 'lodash'
import constants from '../constants.js'
import $ from 'jquery'

const { SHOW_MODAL, HIDE_MODAL } = constants.modal

const initialState = {
  test1: {
    name: 'test1',
    isOpen: false
  },
  'test2': {
    name: 'test2',
    isOpen: false
  }
}

function hide (state, action) {
  const modal = _.extend({}, state[action.payload], { isOpen: false })
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
  HIDE_MODAL: hide
}, initialState)
