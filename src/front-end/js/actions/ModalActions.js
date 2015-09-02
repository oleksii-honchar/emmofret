import { createAction } from 'redux-actions'
import constants from '../constants.js'
const { SHOW_MODAL, HIDE_MODAL, SHAKE_MODAL } = constants.modal


module.exports = {
  show: createAction(SHOW_MODAL),
  hide: createAction(HIDE_MODAL),
  shake: createAction(SHAKE_MODAL)
}

//export function show (modalName) {
//  //$.notifyClose()
//  return {
//    type: SHOW_MODAL,
//    data: modalName
//  }
//}
//
//export function hide (modalName) {
//  //$.notifyClose()
//  return {
//    type: HIDE_MODAL,
//    data: modalName
//  }
//}
//
//export function shake (modalName) {
//  //$.notifyClose()
//  return {
//    type: SHAKE_MODAL,
//    data: modalName
//  }
//}

