import { createAction } from 'redux-actions'
import constants from '../constants.js'
const { SHOW_MODAL, HIDE_MODAL, SHAKE_MODAL_START, SHAKE_MODAL_STOP } = constants.modal

function shake (name) {
  const startShake = createAction(SHAKE_MODAL_START)
  const stopShake = createAction(SHAKE_MODAL_STOP)

  return dispatch => {
    dispatch(startShake(name))
    setTimeout( () => { dispatch(stopShake(name)) }, 300)
  }
}

module.exports = {
  show: createAction(SHOW_MODAL),
  hide: createAction(HIDE_MODAL),
  shake: shake
}

