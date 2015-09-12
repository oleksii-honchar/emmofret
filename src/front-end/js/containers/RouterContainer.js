import React from 'react'
import { Router } from 'react-router'
import { connect } from 'react-redux'
import * as AppActions from '../actions/AppActions.js'
import { PropTypes } from 'react'
import { bindActionCreators } from 'redux'

let staticState = {
  inTransitionToHome : false
}

function select(state) {
  return Object.assign({}, {
    isLoggedIn: state.application.isLoggedIn
  })
}

@connect(select)
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
          appStore.dispatch(AppActions.requestAuth())
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

  willComponentUpdate(nextState, nextProps) {
    //if (!nextProps.isLoggedIn) {
    //  this.context.router.go('/app')
    //}
  }

  render () {
    return (
      <Router {...this.props}>
      </Router>
    )
  }
}