import React from 'react'
import { Router } from 'react-router'
import * as AppActions from '../actions/AppActions.js'
import { PropTypes } from 'react'
import { bindActionCreators } from 'redux'

let staticState = {
  inTransitionToHome : false
}

export default class RouterContainer extends React.Component {
  static requireAuth (store) {
    var appStore = store

    return (nextState, transition) => {
      const { isLoggedIn, nextTransitionPath } = appStore.getState().application

      if (!isLoggedIn) {
        const targetPath = nextState.location.pathname
        if (__CLIENT__) {
          appStore.dispatch(AppActions.rememberTransition(targetPath))
          appStore.dispatch(AppActions.gotoLogin(transition))
        } else {
          RESPONSE.redirect(`/app/login?targetPath=${targetPath}`)
        }
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