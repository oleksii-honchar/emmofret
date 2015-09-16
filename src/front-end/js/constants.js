import _ from 'lodash'

function keyMirror (obj) {
  _.each(obj, (v, key) => {
    if (_.isObject(v)) {
      keyMirror(v)
    } else {
      obj[key] = _.isNull(v) ? key : v
    }
  })

  return obj
}

module.exports = keyMirror({
  application: {
    GOTO_INDEX: null,
    LOG_IN: null,
    LOG_OUT: null,
    SIGN_UP: null,
    REMEMBER_TRANSITION: null,
    FULFILL_TRANSITION: null,
    DISCARD_NEXT_TRANSITION: null,
    REMEMBER_ROUTER: null,
    FETCH_APP_STATE: {
      REQUEST: 'FETCH_APP_STATE_REQUEST',
      SUCCESS: 'FETCH_APP_STATE_SUCCESS',
      ERROR: 'FETCH_APP_STATE_ERROR'
    }
  },
  modal: {
    SHOW_MODAL: null,
    HIDE_MODAL: null
  },
  zIndex: {
    notify: 1060
  }
})
