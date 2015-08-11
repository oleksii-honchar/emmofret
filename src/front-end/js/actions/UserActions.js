import Dispatcher from '../dispatcher.js'
import UserConstants from '../constants/UserConstants.js'
import ModalConstants from '../constants/ModalConstants.js'
import request from 'superagent'
import _ from 'lodash'

function shakeLogin () {
  Dispatcher.dispatch({
    actionType: ModalConstants.SHAKE_MODAL,
    data: 'login'
  })
}

let UserActions = {
  login: (data) => {
    request.post('/api/users/login')
      .set('Content-Type', 'application/json')
      .send(_.pick(data, ['email', 'password']))
      .end((err, res) => {
        if (err) { return shakeLogin()}
      })
  }
}

export default UserActions