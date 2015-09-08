import React from 'react'
import {Router} from 'react-router'
import * as AppActions from '../actions/AppActions.js'
import { connect } from 'react-redux'
import { PropTypes } from 'react'
import { bindActionCreators } from 'redux'

//function select(state) {
//  return {
//    application: state.application
//  }
//}
//
//function actions(dispatch) {
//  return {
//    actions: {
//      requestAuth: bindActionCreators(AppActions.requestAuth, dispatch)
//    }
//  }
//}

export default class RouterContainer extends React.Component{
  constructor (props) {
    super(props)
    this.state = {
      inTransitionToHome : false
    }
  }

  static atHome () {
    var self = this
    return () => {
      self.state.inTransitionToHome = false
    }
  }

  static requireAuth () {
    var self = this
    return (nextState, transition) => {
      const { isLoggedIn, nextTransitionPath } = self.props.application
      if (!isLoggedIn && !self.state.inTransitionToHome) {
        self.state.inTransitionToHome = true
        self.props.actions.requestAuth(nextState.location.pathname)
        transition.to('/')
      } else if (!isLoggedIn) {
        transition.to('/')
      } else {
        self.state.inTransitionToHome = false
      }
    }
  }

  render () {
    return (
      <Router {...this.props} atHome={RouterContainer.atHome} requireAuth={RouterContainer.requireAuth}>
      </Router>
    )
  }
}

//export default connect(select, actions)(RouterContainer)
