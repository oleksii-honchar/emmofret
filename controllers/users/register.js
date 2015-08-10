var User = require('../../models/user')

module.exports = (req, res, next) => {
  User.create(req.body, (err, user) => {
    if (err) return next(err)
    res.body = user.toJSON()
    next()
  })
}
