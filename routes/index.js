var express = require('express')
var apiRouter = express.Router()

var serverCfg = require('konphyg')(process.cwd() + '/config')('server')

module.exports = (app) => {
  app.get('/', function (req, res) {
    res.redirect('/app/dashboard')
  })

  app.get('/app', function (req, res) {
    res.redirect('/app/dashboard')
  })

  require('./auth/jwt')(app) // we need jwt check for all routes

  require('./users')(apiRouter)
  app.use(serverCfg.api.mountPoint, apiRouter)
}
