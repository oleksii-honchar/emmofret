import Dispatcher from '../dispatcher.js'
import UserConstants from '../constants/UserConstants.js'
import _ from 'lodash'
import {EventEmitter} from 'events'
import Immutable from 'immutable'

const CHANGE_EVENT = 'change-user'

var users = Immutable.fromJS({}) // mock - wait for server integration

var Store = _.assign({ state: users }, EventEmitter.prototype, {
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

  login (data) {
    //this.state = this.state.setIn([modalName, 'isOpen'], false)
    this.emitChange()
  }
})

Dispatcher.register( (action) => {
  switch(action.actionType) {
    case UserConstants.LOGIN:
      Store.login(action.data)
      break
    default:
      // no op
  }
})
window.UserStore = Store
export default Store