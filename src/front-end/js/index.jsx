/* global React, $ */
require('./vendor-config')

window.React = require('react/addons')
window.RB = require('react-bootstrap')
window.RRB = require('react-router-bootstrap')

import { Icon } from './components/helpers/FontAwesome.jsx'
window.Icon = Icon

let router = require('./router.js')

$(() => {
  $(':checkbox').labelauty()

  router.run((Handler) => {
    React.render(<Handler/>, document.body)
  })
})

