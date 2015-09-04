import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as AppActions from '../actions/AppActions.js'
import * as ModalActions from '../actions/ModalActions.js'

function select(state) {
  return {
    application: state.application
  }
}

function actions(dispatch) {
  return {
    actions: {
      transitionToHome: bindActionCreators(AppActions.transitionToHome, dispatch),
      requestAuth: bindActionCreators(AppActions.requestAuth, dispatch),
    }
  }
}

export function onEnter (store) {
  console.log(108)
  return (nextState, transition) => {
    const { isLoggedIn, nextTransitionPath } = store.getState().application
    if (!isLoggedIn && !nextTransitionPath) {
      self.props.actions.transitionToHome(transition)
      self.props.actions.requestAuth(nextState.location.pathname)
    }
  }
}

class Private extends React.Component {
  render () {
    return (
      <p>private content pending</p>
    )
  }
}

export default connect(select, actions)(Private)
