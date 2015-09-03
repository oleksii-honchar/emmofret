import React from 'react'
import * as AppActions from '../actions/AppActions.js'

/* containers */
import App from './containers/App.js'

/* partials */
import Dashboard from './pages/Dashboard.js'
import Private from './pages/Private.js'
import Public from './pages/Public.js'

import {Route, Router} from 'react-router'

export default function (history, store) {
  function requireAuth (nextState, transition) {
    const state = store.getState()
    if (!state.application.isLoggedIn)
      AppActions.requestAuth(nextState.location.pathname)
      transition.to('/')
  }

  return (
    <Router history={history}>
      <Route component={App} >
        <Route path='/' component={Dashboard}/>
        <Route path='public' component={Public}/>
        <Route path='private' component={Private} onEnter={requireAuth}/>
      </Route>
    </Router>
  )
}



