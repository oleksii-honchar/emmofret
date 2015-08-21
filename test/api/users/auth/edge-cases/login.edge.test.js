/* global before, after, it, expect, faker, describe, helpers */
var request = require('superagent')

describe('[EDGE CASES] login', function () {
  var currUser
  var userData = {
    email: faker.internet.email(),
    password: faker.internet.password(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName()
  }

  var testUrl = helpers.variables.apiEndpoint + '/users/log-in'

  before(helpers.start)
  before((next) => {
    helpers.user.createAndLogin(userData).then((user) => {
      currUser = user
      next()
    })
  })
  after(helpers.stop)

  it('fail login user with wrong credentials', function (next) {
    var expectedRes = {
      error: 'wrong credentials'
    }

    request.post(testUrl)
      .send({
        email: currUser.email,
        password: 'any'
      })
      .set('Accept', 'application/json')
      .end(function (err, res) {
        expect(err).to.be.an('object')
        expect(res.statusCode).to.be.equal(401)
        expect(res.body).to.be.deep.equal(expectedRes)
        next()
      })
  })
})
