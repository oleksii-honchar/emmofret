/* global __CLIENT__, RESPONSE */
import React from 'react'
import { Router } from 'react-router'
import * as AppActions from '../actions/AppActions.js'

export default class RouterContainer extends React.Component {
  static requireAuth (store) {
    var appStore = store

    return (nextState, transition) => {
      const { isLoggedIn } = appStore.getState().application

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
    return (<Router {...this.props} />)
  }
}
