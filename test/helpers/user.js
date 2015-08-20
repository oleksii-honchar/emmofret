/* global helpers */
var $require = require(process.cwd() + '/lib/require')
var faker = require('faker')
var _ = require('lodash')
var request = require('request')
var Promise = require('bluebird')

var User = $require('models/user')

function activate (userData) {
  var deferred = Promise.defer()
  User.findByCredentials(userData.email, userData.password, function (err, user) {
    if (err) {
      return deferred.reject(err)
    }
    if (!user) {
      return deferred.reject(new Error('user not found ' + userData.email + ' ' + userData.password))
    }
    user.active = true
    user.save(function (res) {
      deferred.resolve(res)
    })
  })

  return deferred.promise
}

function checkUserDefaults (userData) {
  return _.chain(userData).clone().defaults({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  }).value()
}

/**
 * Creates user directly into db
 * userData is object hash of User model properties, where the following will be automatically
 * populated:
 *
 * + firstName
 * + lastName
 * + email
 * + password
 *
 */
function create (userData) {
  var deferred = Promise.defer()

  var fullUserData = checkUserDefaults(userData)

  User.create(fullUserData, function (err, user) {
    if (err) { deferred.reject(err) }
    deferred.resolve(user)
  })

  return deferred.promise
}

function createAndLogin (userData) {
  var fullUserData = checkUserDefaults(userData)
  return create(fullUserData)
    .then(() => { return activate(fullUserData) })
    .then(() => { return login(fullUserData) })
}

function getToken (user) {
  var jwt = require('jsonwebtoken')
  var userProfile = {
    id: user.id.toString(),
    created: user.created,
    email: user.email
  }
  return jwt.sign(userProfile, 'emmofret.meapiv0')
}

function login (userData) {
  var deferred = Promise.defer()
  request.post({
    uri: helpers.variables.apiEndpoint + '/users/log-in',
    json: {
      'email': userData.email,
      'password': userData.password
    }
  }, function (err, res, body) {
    if (err) {
      return deferred.reject(err)
    }
    if (res.statusCode !== 200) {
      return deferred.reject(body)
    }

    deferred.resolve(body)
  })

  return deferred.promise
}

module.exports = function (helpers) {
  helpers.user = {
    getToken: getToken,
    create: create,
    login: login,
    activate: activate,
    createAndLogin: createAndLogin
  }
}
