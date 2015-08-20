import Dispatcher from '../dispatcher.js'
import RouterConstants from '../constants/RouterConstants.js'

export default {
  storeRouterTransitionPath: (path) => {
    Dispatcher.dispatch({
      actionType: RouterConstants.NEXT_TRANSITION_PATH,
      data: path
    })
  }
}