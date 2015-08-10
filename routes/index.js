var express = require('express')
var router = express.Router()
var apiRouter = express.Router()
var frontCfg = require('konphyg')(process.cwd() + '/config')('front-end')
var serverCfg = require('konphyg')(process.cwd() + '/config')('server')

router.get('/', function (req, res) {
  res.render('index', frontCfg.meta)
})

require('./auth/jwt')(apiRouter)
require('./users')(apiRouter)

router.use(serverCfg.api.mountPoint, apiRouter)

module.exports = router
