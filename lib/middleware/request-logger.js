var uuid = require('node-uuid')
var log = require('../logger')

module.exports = (options) => {
  var headerName = 'x-request-id'

  return (req, res, next) => {
    var id = req.headers[headerName] || uuid.v4()

    req.log = log.child({
      type: 'request',
      id: id
    })

    res.setHeader(headerName, id)

    req.log.info({req: req}, 'start request')

    var time = process.hrtime()
    res.on('finish', () => {
      var diff = process.hrtime(time)
      req.log.info({res: res, duration: diff[0] * 1e3 + diff[1] * 1e-9}, 'end request')
    })

    next()
  }
}
