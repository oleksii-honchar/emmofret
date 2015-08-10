var $require = require(process.cwd() + '/lib/require')
var User = $require('models/user')
var errResNotFound = require('../api-err-responders/resource-not-found')
var errResNotAuthorized = require('../api-err-responders/not-authorized')

module.exports = function allowLogged (req, res, next) {
  if (!req.session.userId) {
    return next(errResNotAuthorized())
  }

  if (!req.user) {
    User.findById(req.session.userId, function (err, user) {
      if (err) return next(err)
      if (!user) return next(errResNotFound(req.session.userId, 'User'))
      req.user = user
      next()
    })
  } else {
    next()
  }
}
