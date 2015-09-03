import React from 'react'
//let Router = require('react-router')

//import AppStore from './store/AppStore.js'

/* containers */
import App from './containers/App.js'

/* partials */
import Dashboard from './pages/Dashboard.js'
import Private from './pages/Private.js'
import Public from './pages/Public.js'

import {Route, Router} from 'react-router'


export default function (history) {
  return (
    <Router history={history}>
      <Route component={App} >
        <Route path='/' component={Dashboard}/>
        <Route path='public' component={Public}/>
        <Route path='private' component={Private} onEnter={Private.willTransitionTo}/>
      </Route>
    </Router>
  )
}

