import Dispatcher from '../dispatcher.js'

import UserConstants from '../constants/UserConstants.js'

import _ from 'lodash'
import Backbone from 'backbone'
import notify from '../helpers/notify.js'

let Model = Backbone.Model.extend({})

let Collection = Backbone.Collection.extend({
  model: Model,
  url: '/api/users/current',
  token: '',

  initialize: function () {
    this.dispatchToken = Dispatcher.register(this.dispatchCallback.bind(this))
  },

  dispatchCallback: function (payload) {
    let self = this
    if (!this.me) {
      this.me = this.models[0]
    }

    switch (payload.actionType) {
      case UserConstants.FETCH_CURRENT:
        self.fetchCurrent()
        break
      case UserConstants.LOG_IN:
        self.token = payload.data
        break
      case UserConstants.LOG_OUT:
        self.logOut()
        break
      default:
      // no op
    }
  },

  fetchCurrent: function () {
    this.me.fetch({
      headers: {
        authorization: this.token
      },
      success: function (body) {
        window.sessionStorage.me = JSON.stringify(body)
      },
      error: function (err) {
        notify.error(err)
      }
    })
  },

  getState: function () {
    return this.toJSON()[0]
  },

  isLoggedIn: function () {
    return _.has(this.toJSON()[0], 'id')
  },

  logOut: function () {
    this.token = null
    this.me.clear()
    delete window.sessionStorage.me
  }
})

let data = {}
if (_.has(window.sessionStorage, 'me')) {
  try {
    data = JSON.parse(window.sessionStorage.me)
  } catch (e) {
    delete window.sessionStorage.me
  }
}

let Me = new Model(data)
let Store = new Collection([Me])

export default Store
