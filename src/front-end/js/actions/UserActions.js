import Dispatcher from '../dispatcher.js'
import UserConstants from '../constants/UserConstants.js'

var UserActions = {
  login: (data) => {
    Dispatcher.dispatch({
      actionType: UserConstants.LOGIN,
      data: data
    })
  }
}

export default UserActions