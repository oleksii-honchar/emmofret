var bunyan = require('bunyan')
var pkg = require(process.cwd() + '/package.json')
var _ = require('lodash')

function reqSerializer (req) {
  var headers = _.pick(req.headers, ['host', 'user-agent', 'x-real-ip'])

  var res = {
    method: req.method,
    url: req.url,
    headers: headers
  }

  if (!_.isEmpty(req.query)) { res.query = req.query }
  if (!_.isEmpty(req.params)) { res.params = req.params }
  if (!_.isEmpty(req.body)) { res.body = req.body }

  return res
}

function resSerializer (res) {
  var headers = _.pick(res._headers, ['content-length', 'content-type'])

  return {
    statusCode: res.statusCode,
    headers: headers,
    body: res.body
  }
}

function errSerializer (err) {
  if (!_.isObject(err)) return err

  var resErr = err.name || 'Error'
  resErr = resErr + ': '
  if (_.has(err, 'message') && !_.isEmpty(err.message)) {
    resErr = resErr + err.message
  }
  if (_.has(err, 'body.errors.base') && _.isArray(err.body.errors.base)) {
    resErr = resErr + err.body.errors.base.join(', ')
  }

  return resErr
}

var opts = {
  name: pkg.name,
  level: 'error',
  serializers: {
    req: reqSerializer,
    res: resSerializer
  }
}

if (_.include(['development', 'test'], process.env.NODE_ENV)) {
  var bunyanFormat = require('bunyan-format')
  var formatOut = bunyanFormat({outputMode: 'short'})

  var logLevel = process.env.NODE_ENV === 'development' ? 'info' : 'error'
  //logLevel = process.env.NODE_ENV === 'test' ? 'info' : logLevel

  opts = _.extend(opts, {
    stream: formatOut,
    level: logLevel,
    serializers: _.extend(opts.serializers, {
      err: errSerializer
    })
  })
}

var logger = bunyan.createLogger(opts)

module.exports = logger
