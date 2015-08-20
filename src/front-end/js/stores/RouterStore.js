import Dispatcher from '../dispatcher.js'
import RouterConstants from '../constants/RouterConstants.js'
import _ from 'lodash'
import Backbone from 'backbone'

class Store {
  constructor() {
    this.nextRouterPath = null
  }
  dispatchCallback (payload) {
    let self = this
    if (!this.me)
      this.me = this.models[0]

    switch(payload.actionType) {
      case RouterConstants.NEXT_TRANSITION_PATH:
        this.nextRouterPath = payload.data
        break
      default:
      // no op
    }
  }

  get nextTransitionPath() {
    let nextPath = this.nextRouterPath
    this.nextRouterPath = null
    return nextPath
  }

}

export default new Store()