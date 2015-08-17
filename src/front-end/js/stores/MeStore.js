import Dispatcher from '../dispatcher.js'
import UserConstants from '../constants/UserConstants.js'
import MeConstants from '../constants/MeConstants.js'
import _ from 'lodash'
import Backbone from 'backbone'

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
          success: function (data) {
            console.log('me get-current success')
            console.dir(data)
          },
          error: function (err) {
            console.error('me get-current error')
            console.dir(err)
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

let Me = new Model()
let Store = new Collection([Me])
window.MeStore = Store
export default Store