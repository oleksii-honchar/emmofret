var jwt = require('jsonwebtoken')
var expressJwt = require('express-jwt')
var secretsCfg = require('konphyg')(process.cwd() + '/config')('secrets')

module.exports = function (router) {
  var authorize = expressJwt({
    secret: secretsCfg.jwt.key,
    getToken: function fromReq (req) {
      if (req.headers.authorization) {
        return req.headers.authorization
      } else if (req.query && req.query.token) {
        return req.query.token
      } else if (req.cookies && req.cookies.token) {
        return req.cookies.token
      }
      return null
    }
  })

  router.use(
    function (req, res, next) {
      req.getToken = function (user) {
        var userProfile = {
          id: user.id.toString(),
          created: user.created,
          email: user.email
        }
        return jwt.sign(userProfile, secretsCfg.jwt.key, secretsCfg.jwt.options)
      }

      req.session = {}

      if (req.headers['authorization'] || req.cookies['token']) {
        authorize(req, res, function (v) {
          if (req.user) {
            req.session.userId = req.user.id
            req.session.user = req.user
            delete req.user
          }
          next()
        })
      } else {
        next()
      }
    }
  )
}
