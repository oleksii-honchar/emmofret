var mongoCfg = require('konphyg')(process.cwd() + '/config')('mongo')

var mongoose = require('mongoose')
var requireTree = require('require-tree')
var Promise = require('bluebird')
var log = require('../logger')

requireTree(process.cwd() + '/models')

module.exports = function connect () {
  var deferred = Promise.defer()
  log.info('Connecting to MongoDB on %s', mongoCfg.uri)
  mongoose.connect(mongoCfg.uri)

  var db = mongoose.connection
  db.on('error', function connectionError (err) {
    // TODO error reporters check
    // errorReporter(err)
    deferred.reject(err)
  })
  db.once('open', function callback () {
    log.info('Connected to MongoDB on %s', mongoCfg.uri)
    deferred.resolve(db)
  })

  return deferred.promise
}
