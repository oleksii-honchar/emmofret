import React from 'react'
import { requestAuth } from '../actions/AppActions.js'
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
      requestAuth: bindActionCreators(requestAuth, dispatch),
    }
  }
}

class Routes extends React.Component{
  requireAuth () {
    const self = this
    return (nextState, transition) => {
      if (!self.props.application.isLoggedIn) {
        self.props.actions.requestAuth(nextState.location.pathname)
        transition.to('/')
      }
    }
  }

  render () {
    return (
      <Router history={this.props.history}>
        <Route component={App} >
          <Route path='/' component={Dashboard}/>
          <Route path='public' component={Public}/>
          <Route path='private' component={Private} onEnter={this.requireAuth()}/>
        </Route>
      </Router>
    )
  }
}

Routes.propTypes = {
  history: PropTypes.object.isRequired
}

export default connect(select, actions)(Routes)
