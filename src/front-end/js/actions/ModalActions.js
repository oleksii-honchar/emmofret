import Dispatcher from '../dispatcher.js'
import ModalConstants from '../constants/ModalConstants.js'

var ModalActions = {
  show: (modalName) => {
    $.notifyClose()
    Dispatcher.dispatch({
      actionType: ModalConstants.SHOW_MODAL,
      data: modalName
    })
  },

  hide: (modalName) => {
    $.notifyClose()
    Dispatcher.dispatch({
      actionType: ModalConstants.HIDE_MODAL,
      data: modalName
    })
  },

  shake: (modalName) => {
    $.notifyClose()
    Dispatcher.dispatch({
      actionType: ModalConstants.SHAKE_MODAL,
      data: modalName
    })
  }
}

export default ModalActions