module.exports = function (reason) {
  reason = reason || 'not enough permissions'
  var err = new Error(reason)
  err.name = 'Not enough permissions'
  err.code = 401
  return err
}
