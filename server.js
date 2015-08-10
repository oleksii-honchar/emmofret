process.env.NODE_ENV = process.env.NODE_ENV || 'development'

var initMongo = require('./lib/initializers/mongo')
var initExpress = require('./lib/initializers/express')
var http = require('http')
var Promise = require('bluebird')
var log = require('./lib/logger')
var _ = require('lodash')

if (_.include(['development', 'test'], process.env.NODE_ENV)) {
  require('longjohn')
}

log.info('Starting app in [' + process.env.NODE_ENV + '] mode')

var serverCfg = require('konphyg')(process.cwd() + '/config')('server')
var port = serverCfg.port || 3000
var server
var onServerListenHook = null

Promise.all([initMongo(), initExpress()])
  .then(function (res) {
    var app = res[1]
    server = http.createServer(app)
    server.listen(port)
    server.on('error', onError)
    server.on('listening', onListening)
    server.on('close', onClosing)
  })
  .done()

function onError (error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  var bind = 'Port ' + port

  switch (error.code) {
    case 'EACCES':
      log.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      log.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

function onListening () {
  var addr = server.address()
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port
  log.info('Listening on ' + bind)
  if (_.isFunction(onServerListenHook)) {
    onServerListenHook(null, server)
  }
}

function onClosing () {
  log.info('Server stopped')
}

module.exports = function (hook) {
  if (_.isFunction(hook)) {
    onServerListenHook = hook
  }
}
