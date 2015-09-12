var express = require('express')
var router = express.Router()
var apiRouter = express.Router()

var pkg = require(process.cwd() + '/package.json')
var serverCfg = require('konphyg')(process.cwd() + '/config')('server')

module.exports = (app) => {
  app.get('/', function (req, res) {
    res.redirect('/app')
  })

  require('./auth/jwt')(app) // we need jwt check for all routes

  require('./users')(apiRouter)
  app.use(serverCfg.api.mountPoint, apiRouter)
}
