import 'font-awesome/scss/font-awesome.scss'
import 'index.scss'

import './vendor-config'

import { Icon } from './components/helpers/FontAwesome.js'
window.Icon = Icon

import React from 'react'
import BrowserHistory from 'react-router/lib/BrowserHistory'

import Root from './containers/Root.js'

let history = new BrowserHistory()

React.render(<Root history={history}/>, document.body)
