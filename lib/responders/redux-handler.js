'use strict'
var React = require('react')
var _ = require('lodash')

var Location = require('react-router/lib/Location')

var initStore = require('../../src/front-end/js/store')
var initRouter = require('../../src/front-end/js/router')

const pkg = require(process.cwd() + '/package.json')

function reduxHandler (req, res, next) {
  const location = new Location(req.path, req.query)
  let initialState = {
    application: {
      token: null,
      user: null,
      nextTransitionPath: req.query.targetPath || ''
    }
  }

  if (_.result(req, 'session.user')) {
    initialState.application = _.merge(initialState.application, {
      token: req.cookies.token,
      user: req.session.user
    })
  }

  global.INITIAL_STATE = JSON.stringify(initialState)
  let store = initStore()
  global.RESPONSE = res

  initRouter(location, undefined, store)
    .then(({content}) => {
      const html = React.renderToString(content)
      var opts = {
        title: pkg.name,
        author: pkg.author,
        description: pkg.description,
        version: pkg.version,
        keywords: pkg.keywords.join(', '),
        html: html,
        initialState: JSON.stringify(store.getState())
      }

      if (!res.headersSent) {
        res.render('index', opts)
      }
    })
    .catch((err) => {
      console.error(err)
      next(err)
    })
}

module.exports = (app) => app.get('/app*', reduxHandler)
