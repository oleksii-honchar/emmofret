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

function login (data) {
  request.post('/api/users/login')
    .set('Content-Type', 'application/json')
    .send(_.pick(data, ['email', 'password']))
    .end((err, res) => {
      if (err) { return shakeLogin()}
    })
}

function signUp(data) {
  console.log('UserActions: sign-up pending')
  console.dir(data)
}

let UserActions = {
  login: login,
  signUp: signUp
}

export default UserActions