import React from 'react'
import { Router } from 'react-router'
import * as AppActions from '../actions/AppActions.js'
import { PropTypes } from 'react'
import { bindActionCreators } from 'redux'

let staticState = {
  inTransitionToHome : false
}

export default class RouterContainer extends React.Component{
  static atHome (store) {
    var appStore = store
    return () => {
      staticState.inTransitionToHome = false
    }
  }

  static requireAuth (store) {
    var appStore = store

    return (nextState, transition) => {
      const { isLoggedIn, nextTransitionPath } = appStore.getState().application

      if (!isLoggedIn && !staticState.inTransitionToHome) {
        staticState.inTransitionToHome = true
        if (__CLIENT__) {
          appStore.dispatch(AppActions.requestAuth(nextState.location.pathname))
          transition.to('/app/dashboard')
        } else {
          RESPONSE.redirect('/app/dashboard')
        }
      } else if (!isLoggedIn) {
        if (__CLIENT__) {
          transition.to('/app/dashboard')
        } else {
          RESPONSE.redirect('/app/dashboard')
        }
      } else {
        staticState.inTransitionToHome = false
      }
    }
  }

  render () {
    return (
      <Router {...this.props}>
      </Router>
    )
  }
}