import Dispatcher from '../dispatcher.js'
import ModalConstants from '../constants/ModalConstants.js'
import _ from 'lodash'
import {EventEmitter} from 'events'
import Immutable from 'immutable'

const CHANGE_EVENT = 'change-modal'

var modals = Immutable.fromJS({
  'login': { isOpen : false },
  'sign-up': { isOpen : false }
})


var Store = _.assign({ state: modals }, EventEmitter.prototype, {
  emitChange () {
    this.emit(CHANGE_EVENT)
  },

  addChangeListener (cb) {
    this.on(CHANGE_EVENT, cb)
  },

  removeChangeListener (cb) {
    this.removeListener(CHANGE_EVENT, cb)
  },

  getState () {
    return this.state;
  },

  hide (modalName) {
    this.state = this.state.setIn([modalName, 'isOpen'], false)
    this.emitChange()
  },

  shake (modalName) {
    this.state = this.state.setIn([modalName, 'shaking'], true)
      .setIn([modalName, 'shakeStyle'], 'horizontal')
    this.emitChange()

    setTimeout( function () {
      this.state = this.state.setIn([modalName, 'shaking'], false)
      this.emitChange()
    }.bind(this), 200)
  },

  show (modalName) {
    this.state = this.state.map((opts, name) => {
      var res
      if (name === modalName)
        res = opts.set('isOpen', true)
      else
        res = opts.set('isOpen', false)

      return res
    })
    this.emitChange()
  }
})

Dispatcher.register( (action) => {
  switch(action.actionType) {
    case ModalConstants.SHAKE_MODAL:
      Store.shake(action.data)
      break
    case ModalConstants.SHOW_MODAL:
      Store.show(action.data)
      break
    case ModalConstants.HIDE_MODAL:
      Store.hide(action.data)
      break
    default:
      // no op
  }
})
window.ModalStore = Store
export default Store