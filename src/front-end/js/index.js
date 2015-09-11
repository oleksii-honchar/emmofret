import 'font-awesome/scss/font-awesome.scss'
import 'index.scss'

import { Icon } from './components/helpers/FontAwesome.js'
window.Icon = Icon

import React from 'react'
import BrowserHistory from 'react-router/lib/BrowserHistory'
import Location from 'react-router/lib/Location';

import initStore from './store.js'
import initRouter from './router.js'

const history = new BrowserHistory()
const search = document.location.search
const query = search && queryString.parse(search)
const location = new Location(document.location.pathname, query)

$( () => {
  const store = initStore()
  initRouter(location, history, store)
    .then( ({content}) => {
      React.render(content, document.body)
    })
})
