import Dispatcher from '../dispatcher.js'
import UserConstants from '../constants/UserConstants.js'
import ModalConstants from '../constants/ModalConstants.js'
import zIndexConstants from '../constants/zIndexConstands.js'
import request from 'superagent'
import _ from 'lodash'

function shakeLogin () {
  Dispatcher.dispatch({
    actionType: ModalConstants.SHAKE_MODAL,
    data: 'login'
  })
}

function showError (body) {
  let msg = ''

  if(_.has(body, 'error')) { msg = body.error }
  else if (_.has(body, 'errors')) {
    if(_.isObject(body.errors)) {
      _.each(body.errors, (val, key) => {
        msg += `<span class="label label-warning">${key}</span> ${val.join('\n')}`
      })
    } else if(_.isArray(body.errors)) {
      msg = body.errors.join('\n')
    }
  }

  $.notify({
    message: msg
  }, {
    type: 'danger',
    delay: 5000,
    z_index: zIndexConstants.notify
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
  request.post('/api/users/register')
    .set('Content-Type', 'application/json')
    .send(_.pick(data, ['firstName', 'lastName', 'email', 'password']))
    .end((err, res) => {
      if (err) { return showError(res.body) }
      console.dir(res.body)
    })
}

let UserActions = {
  login: login,
  signUp: signUp
}

export default UserActions