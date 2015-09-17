import { createAction } from 'redux-actions'
import constants from '../constants.js'
const { SHOW_MODAL, HIDE_MODAL } = constants.modal

module.exports = {
  show: createAction(SHOW_MODAL),
  hide: createAction(HIDE_MODAL)
}
