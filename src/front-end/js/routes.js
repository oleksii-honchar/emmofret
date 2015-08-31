import React from 'react'
//let Router = require('react-router')

//import AppStore from './store/AppStore.js'

/* containers */
import App from './containers/App.js'

/* partials */
import Dashboard from './partials/Dashboard.js'
//let Private = require('./partials/Private.js')
//let Public = require('./partials/Public.js')

import {Route, Router} from 'react-router'


export default function (history) {
  return (
    <Router history={history}>
      <Route component={App} >
        <Route path='/' component={Dashboard}/>
      </Route>
    </Router>
  )

}

//<Route name='public' handler={Public}/>
//  <Route name='private' handler={Private}/>
