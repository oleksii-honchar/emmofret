import Dispatcher from '../dispatcher.js'
import RouterConstants from '../constants/RouterConstants.js'

class Store {
  constructor () {
    this.nextRouterPath = null
    this.dispatchToken = Dispatcher.register(this.dispatchCallback.bind(this))
  }
  dispatchCallback (payload) {
    let self = this

    switch (payload.actionType) {
      case RouterConstants.NEXT_TRANSITION_PATH:
        self.nextRouterPath = payload.data
        break
      default:
      // no op
    }
  }

  get nextTransitionPath () {
    let nextPath = this.nextRouterPath
    this.nextRouterPath = null
    return nextPath
  }

}

export default new Store()
