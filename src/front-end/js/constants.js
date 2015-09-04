import _ from 'lodash'

module.exports = {
  application: _.keyMirror({
    LOG_IN: null,
    LOG_OUT: null,
    SIGN_UP: null,
    REMEMBER_TRANSITION: null,
    FULFILL_TRANSITION: null,
    DISCARD_NEXT_TRANSITION: null,
    REMEMBER_ROUTER: null
  }),
  modal: _.keyMirror({
    SHOW_MODAL: null,
    HIDE_MODAL: null,
    SHAKE_MODAL_START: null,
    SHAKE_MODAL_STOP: null
  }),
  zIndex: {
    notify: 1060
  }
}
