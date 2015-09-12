var React = require('react')
var Router = require('react-router')
import _ from 'lodash'

import Location from 'react-router/lib/Location'

import initStore from '../../src/front-end/js/store'
import initRouter from '../../src/front-end/js/router'

const pkg = require(process.cwd() + '/package.json')

export function reduxHandler (req, res, next) {
  const location = new Location(req.path, req.query)
  let initialState =  {
    application: {
      token: null,
      user: null
    }
  }

  if (_.result(req, 'session.user')) {
    initialState.application = _.merge(initialState.application, {
      token:  req.cookies.token,
      user:  req.session.user
    })
  }

  global.INITIAL_STATE = JSON.stringify(initialState)
  let store = initStore()
  global.RESPONSE = res

  initRouter(location, undefined, store)
    .then( ({content}) => {
      const html =  React.renderToString(content)
      var opts = {
        title: pkg.name,
        author: pkg.author,
        description: pkg.description,
        version: pkg.version,
        keywords: pkg.keywords.join(', '),
        html: html,
        initialState: JSON.stringify(store.getState()),
      }

      if (!res.headersSent) {
        res.render('index', opts)
      }
    })
    .catch( (err) => {
      console.error(err)
      next(err)
    })
}

export default (app) => app.get('/app*', reduxHandler)