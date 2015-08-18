import Dispatcher from '../dispatcher.js'

import UserConstants from '../constants/UserConstants.js'
import MeConstants from '../constants/MeConstants.js'
import ModalStore from '../stores/ModalStore.js'

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
    if (!this.me)
      this.me = this.models[0]

    switch(payload.actionType) {
      case MeConstants.FETCH_CURRENT:
        self.me.fetch({
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
        break
      case MeConstants.SET_TOKEN:
        self.token = payload.data
        break
      default:
      // no op
    }
  },

  getState: function () {
    return this.toJSON()[0]
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

// TODO: debug only
//window.MeStore = Store
export default Store