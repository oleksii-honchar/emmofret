import React from 'react'
import { Route, Redirect } from 'react-router'
import RouterContainer from './containers/RouterContainer'

/* containers */
import App from './containers/App.js'

/* partials */
import Dashboard from './pages/Dashboard.js'
import Private from './pages/Private.js'
import Public from './pages/Public.js'
import Registration from './pages/Registration.js'
import Login from './pages/Login.js'

function onEnter () { $.notifyClose() }

export default (store) => {
  return (
    <Route path='/app' component={App}>
      <Route path='/login' component={Login} onEnter={onEnter}/>
      <Route path='/registration' component={Registration} onEnter={onEnter}/>
      <Route path='/dashboard' component={Dashboard}/>
      <Route path='/public' component={Public}/>
      <Route path='/private' component={Private} onEnter={RouterContainer.requireAuth(store)}/>
      <Redirect from='/app' to='/dashboard'/>
    </Route>
  )
}