module.exports = (req, res, next) => {
  req.session.userId = null
  res.body = {success: true}
  next()
}
