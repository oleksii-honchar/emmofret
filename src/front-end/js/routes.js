import React from 'react'
import { Route, Redirect } from 'react-router'
import RouterContainer from './containers/RouterContainer'

/* containers */
import App from './containers/App.js'

/* partials */
import Dashboard from './pages/Dashboard.js'
import Private from './pages/Private.js'
import Public from './pages/Public.js'

export default (store) => {
  return (
    <Route path='/app' component={App} onEnter={RouterContainer.atHome(store)}>
      <Route path='/dashboard' component={Dashboard}/>
      <Route path='/public' component={Public}/>
      <Route path='/private' component={Private} onEnter={RouterContainer.requireAuth(store)}/>
      <Redirect from='/app' to='/dashboard'/>
    </Route>
  )
}