import 'font-awesome/scss/font-awesome.scss'
import 'index.scss'

import './vendor-config'

import { Icon } from './components/helpers/FontAwesome.js'
window.Icon = Icon

import React from 'react'
import BrowserHistory from 'react-router/lib/BrowserHistory'
import Location from 'react-router/lib/Location';

let history = new BrowserHistory()

const search = document.location.search;
const query = search && queryString.parse(search);
const location = new Location(document.location.pathname, query);

import store from './store.js'
import initRouter from './router.js'

$( () => {
  initRouter(location, history, store)
    .then( ({content}) => {
      React.render(content, document.body)
    })
})
