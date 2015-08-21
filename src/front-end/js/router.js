/* global React */
let Router = require('react-router')

/* pages */
let App = require('./pages/App.jsx')

/* partials */
let Dashboard = require('./partials/Dashboard.jsx')
let Private = require('./partials/Private.jsx')
let Public = require('./partials/Public.jsx')

let {Route, DefaultRoute} = Router

let routes = (
  <Route name='app' path='/' handler={App} >
    <Route name='dashboard' handler={Dashboard}/>
    <Route name='public' handler={Public}/>
    <Route name='private' handler={Private}/>
    <DefaultRoute handler={Dashboard} />
  </Route>
)

let router = Router.create(routes)

export default router
