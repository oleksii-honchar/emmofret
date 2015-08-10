var $require = require(process.cwd() + '/lib/require')
var errResNotAuthorized = $require('lib/api-err-responders/not-authorized')
var errResNotFound = $require('lib/api-err-responders/resource-not-found')
var User = $require('models/user')

module.exports = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return next(errResNotAuthorized('credentials missed'))
  }

  var email = req.body.email.toString()
  var password = req.body.password.toString()

  User.findByCredentials(email, password, (err, user) => {
    if (err) return next(err)
    if (!user) return next(errResNotAuthorized('wrong credentials'))
    res.body = user.toJSON()
    res.body.token = req.getToken(res.body)
    next()
  })

}
