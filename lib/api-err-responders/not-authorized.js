module.exports = function (reason) {
  reason = reason || 'not authorized'
  var err = new Error(reason)
  err.name = 'Not authorized'
  err.code = 401
  return err
}
