var $require = require(process.cwd() + '/lib/require')
var path = require('path')
var rmdir = require('rimraf')
var faker = require('faker')
var mongoose = require('mongoose')

var chai = require('chai')
var chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)

process.env.NODE_ENV = 'test'

var mongoCfg = require('konphyg')(process.cwd() + '/config')('mongo')
var serverCfg = require('konphyg')(process.cwd() + '/config')('server')
var pkg = $require('package.json')

global.expect = chai.expect
global.sinon = require('sinon')
global.faker = faker

var helpers = global.helpers = {}
var variables = helpers.variables = {
  dbUri: mongoCfg.uri,
  httpEndpoint: 'http://127.0.0.1:' + serverCfg.port,
  apiEndpoint: 'http://127.0.0.1:' + serverCfg.port + serverCfg.api.mountPoint,
  uploadsDir: path.join(process.cwd(), '/test/uploads')
}

require('./testCRUD')(helpers)
// require('./mock-resources')(helpers)
require('./user')(helpers)

helpers.cleanUploads = function (next) {
  rmdir(variables.uploadsDir, next)
}

helpers.cleanDB = function (next) {
  mongoose.connect(variables.dbUri, function (err) {
    if (err) return next(err)
    mongoose.connection.db.dropDatabase(function () {
      mongoose.disconnect(next)
    })
  })
}

helpers.server = null

var stopCallTimeoutId = null

function start (next) {
  if (helpers.server) {
    // sever should be started once per folder
    if (stopCallTimeoutId) { clearTimeout(stopCallTimeoutId) }
    return next()
  }

  helpers.cleanDB(function (err) {
    if (err) return next(err)
    if (!helpers.server) {
      $require(pkg.main)((err, server) => {
        if (err) { console.error(err) }
        helpers.server = server
        process.nextTick(next)
      })
    } else { next() }
  })
}

function stop (next) {
  if (stopCallTimeoutId) { clearTimeout(stopCallTimeoutId) }
  stopCallTimeoutId = setTimeout(stopServer, 1000)
  next()
}

function stopServer () {
  if (helpers.server) {
    helpers.server.close()
    process.exit(0)
  }
}

helpers.start = start
helpers.stop = stop

helpers.stopAndCleanupUploads = function (next) {
  helpers.stop(function (err) {
    if (err) return next(err)
    helpers.cleanUploads(next)
  })
}
