import _ from 'lodash'

import $ from 'jquery'
let window = window || global
window.$ = window.jQuery = $

import 'bootstrap-notify'
require('./jquery-plugins/labelauty.js')

$(() => {
  $(':checkbox').labelauty()
})
