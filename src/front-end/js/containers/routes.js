import React from 'react'
import * as AppActions from '../actions/AppActions.js'
import { connect } from 'react-redux'
import { PropTypes } from 'react'
import { bindActionCreators } from 'redux'

/* containers */
import App from '../containers/App.js'

/* partials */
import Dashboard from '../pages/Dashboard.js'
import Private from '../pages/Private.js'
import Public from '../pages/Public.js'

import {Route, Router} from 'react-router'

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
        <Route component={App} >
          <Route path='/' component={Dashboard} onEnter={this.atHome()}/>
          <Route path='public' component={Public}/>
          <Route path='private' component={Private} onEnter={this.requireAuth()}/>
        </Route>
      </Router>
    )
  }
}

export default connect(select, actions)(Routes)
