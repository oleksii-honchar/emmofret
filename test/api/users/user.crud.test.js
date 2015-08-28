/* global before, after, faker, describe, helpers, expect */
describe('users CRUD', function () {
  var currUser
  var currHeader
  var testUrl = helpers.variables.apiEndpoint + '/users'

  function getUserData () {
    return {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    }
  }

  var userData1 = getUserData()
  var userData2 = getUserData()

  before(helpers.start)
  after(helpers.stop)

  describe('checking', helpers.testCRUD(testUrl, {
    'create-valid': {
      data: userData1,
      after: (res, next) => {
        currUser = res.body
        currUser.password = userData1.password

        helpers.user.login(currUser).then((res) => {
          currHeader = { Authorization: res.token }
          next()
        })
      }
    },
    'create-invalid': {
      data: {
        'email': 'invalid'
      }
    },
    'patch-valid': {
      header: () => { return currHeader },
      data: {
        'email': faker.internet.email()
      }
    },
    'patch-invalid': {
      header: () => { return currHeader },
      data: {
        'email': 'invalid'
      },
      expects: (err, res) => {
        expect(err).to.be.not.defined
        var body = res.body
        expect(body.errors.email[0]).to.equal('email invalid')
      }
    },
    'retrieve-set': {
      data: userData2
    }
  }))
})
