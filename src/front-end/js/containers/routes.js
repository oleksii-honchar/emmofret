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
      transitionToHome: bindActionCreators(AppActions.transitionToHome, dispatch),
      requestAuth: bindActionCreators(AppActions.requestAuth, dispatch),
    }
  }
}

class Routes extends React.Component{
  static requireAuth () {
    const self = this
    console.log(108)
    return (nextState, transition) => {
      const { isLoggedIn, nextTransitionPath } = self.props.application
      if (!isLoggedIn && !nextTransitionPath) {
        self.props.actions.transitionToHome(transition)
        self.props.actions.requestAuth(nextState.location.pathname)
      }
    }
  }

  render () {
    return (
      <Router history={this.props.history}>
        <Route component={App} >
          <Route path='/' component={Dashboard}/>
          <Route path='public' component={Public}/>
          <Route path='private' component={Private} onEnter={Private.Private.onEnter()}/>
        </Route>
      </Router>
    )
  }
}

Routes.propTypes = {
  history: PropTypes.object.isRequired
}

export default connect(select, actions)(Routes)
