import React from 'react'
import {Router} from 'react-router'
import * as AppActions from '../actions/AppActions.js'
import { connect } from 'react-redux'
import { PropTypes } from 'react'
import { bindActionCreators } from 'redux'

//
//function actions(dispatch) {
//  return {
//    actions: {
//      requestAuth: bindActionCreators(AppActions.requestAuth, dispatch)
//    }
//  }
//}

let state = {
  inTransitionToHome : false
}

export default class RouterContainer extends React.Component{
  static atHome (store) {
    var appStore = store
    return () => {
      state.inTransitionToHome = false
    }
  }

  static requireAuth (store) {
    var appStore = store

    return (nextState, transition) => {
      const { isLoggedIn, nextTransitionPath } = appStore.getState().application
      if (!isLoggedIn && !state.inTransitionToHome) {
        state.inTransitionToHome = true
        appStore.dispatch(AppActions.requestAuth())
        transition.to('/')
      } else if (!isLoggedIn) {
        transition.to('/')
      } else {
        state.inTransitionToHome = false
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