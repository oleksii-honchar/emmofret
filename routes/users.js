var $require = require(process.cwd() + '/lib/require')
var requireTree = require('require-tree')
var usersCtrl = requireTree('../controllers/users')
var apiHelpers = requireTree('../lib/api-helpers')

var User = $require('models/user')

module.exports = function (router) {
  router.get('/users/current', [ apiHelpers.allowLogged, usersCtrl.current ])
  router.post('/users/login', usersCtrl.login)
  router.post('/users/register', usersCtrl.register)

  router.use('/users', apiHelpers.buildCRUD(User, {
    actions: {
      'pre-list': apiHelpers.allowLogged,
      'pre-retrieve': apiHelpers.allowLogged,
      'pre-patch': apiHelpers.allowLogged,
      'pre-remove': apiHelpers.allowLogged,
      update: false
    }
  }))
}
