var express = require('express')
var router = express.Router()
var apiRouter = express.Router()

var pkg = require(process.cwd() + '/package.json')
var serverCfg = require('konphyg')(process.cwd() + '/config')('server')

require('./auth/jwt')(apiRouter)
require('./users')(apiRouter)

router.use(serverCfg.api.mountPoint, apiRouter)

//router.get('/', function (req, res) {
//  var opts = {
//    title: pkg.name,
//    author: pkg.author,
//    description: pkg.description,
//    version: pkg.version,
//    keywords: pkg.keywords.join(', ')
//  }
//  res.render('index', opts)
//})

module.exports = router
