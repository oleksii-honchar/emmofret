import 'font-awesome/scss/font-awesome.scss'
import 'index.scss'

import './vendor-config'

import { Icon } from './components/helpers/FontAwesome.js'
window.Icon = Icon

import React from 'react'
import HashHistory from 'react-router/lib/HashHistory'

import Root from './containers/Root.js'

let history = new HashHistory()

$(() => {
  React.render(<Root history={history}/>, document.body)
})
