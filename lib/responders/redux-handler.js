var React = require('react')
var Router = require('react-router')
import Location from 'react-router/lib/Location'

import '../../src/front-end/js/vendor-config.js'
import store from '../../src/front-end/js/store'
import initRouter from '../../src/front-end/js/router'

var pkg = require(process.cwd() + '/package.json')

module.exports = (app) => {
  app.use((req, res) => {
    const location = new Location(req.path, req.query)

    initRouter(location, undefined, store)
      .then( ({content}) => {
        const html =  React.renderToString(content)

        var opts = {
          title: pkg.name,
          author: pkg.author,
          description: pkg.description,
          version: pkg.version,
          keywords: pkg.keywords.join(', '),
          html: html
        }
        res.render('index', opts)
      })
  })
}