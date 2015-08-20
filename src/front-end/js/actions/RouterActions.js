import Dispatcher from '../dispatcher.js'
import RouterConstants from '../constants/RouterConstants.js'

export default {
  storeRouterTransitionPath: (path) => {
    Dispatcher.dispatch(RouterConstants.NEXT_TRANSITION_PATH, path)
  }
}