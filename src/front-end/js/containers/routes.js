import React from 'react'
import {Router} from 'react-router'
import * as AppActions from '../actions/AppActions.js'
import { connect } from 'react-redux'
import { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import routes from '../routes'

function select(state) {
  return {
    application: state.application
  }
}

function actions(dispatch) {
  return {
    actions: {
      requestAuth: bindActionCreators(AppActions.requestAuth, dispatch)
    }
  }
}

class Routes extends React.Component{
  constructor (props) {
    super(props)
    this.state = {
      inTransitionToHome : false
    }
  }

  static propTypes = {
    history: PropTypes.object.isRequired
  }

  atHome () {
    var self = this
    return () => {
      self.state.inTransitionToHome = false
    }
  }

  requireAuth () {
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
      <Router history={this.props.history}>
        {routes}
      </Router>
    )
  }
}

export default connect(select, actions)(Routes)
