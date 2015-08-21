/* global before, after, it, expect, faker, describe, helpers */
var request = require('superagent')
var _ = require('lodash')

describe('[EDGE-CASES] register', function () {
  var userData = {
    email: faker.internet.email(),
    password: faker.internet.password(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName()
  }

  var testUrl = helpers.variables.apiEndpoint + '/users/register'

  before(helpers.start)
  after(helpers.stop)

  it('don\'t register new user with wrong details', function (next) {
    var currUserData = _.clone(userData)
    delete currUserData.lastName
    var expectedRes = {
      errors: {
        lastName: ['Path `lastName` is required.']
      }
    }

    request.post(testUrl)
      .send(currUserData)
      .set('Accept', 'application/json')
      .end(function (err, res) {
        expect(err).to.be.an('object')
        expect(res.statusCode).to.be.equal(422)
        expect(res.body).to.be.deep.equal(expectedRes)
        next()
      })
  })
})
