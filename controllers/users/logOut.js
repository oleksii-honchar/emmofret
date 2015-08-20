var $require = require(process.cwd() + '/lib/require')
var errResNotAuthorized = $require('lib/api-err-responders/not-authorized')
var errResNotFound = $require('lib/api-err-responders/resource-not-found')
var User = $require('models/user')

module.exports = (req, res, next) => {
  req.session.userId = null
  res.body = {success: true}
  next()
}
