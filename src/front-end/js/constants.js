import _ from 'lodash'

module.exports = {
  application: _.keyMirror({
    LOG_IN: null,
    LOG_OUT: null,
    SIGN_UP: null
  }),
  modal: _.keyMirror({
    SHOW_MODAL: null,
    HIDE_MODAL: null,
    SHAKE_MODAL: null
  }),
  zIndex: {
    notify: 1060
  }
}
