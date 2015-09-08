var $require = require('../require')
var express = require('express')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var favicon = require('serve-favicon')
var path = require('path')
var methodOverride = require('method-override')
var multer = require('multer')
var compress = require('compression')

var layouts = require('handlebars-layouts')
var hbs = require('hbs')
var hbsUtils = require('hbs-utils')(hbs)
hbs.handlebars.registerHelper(layouts(hbs.handlebars))

hbsUtils.registerPartials(process.cwd() + '/views/partials')

var config = require('konphyg')(process.cwd() + '/config')
var serverCfg = config('server')
var secretsCfg = config('secrets')

var expressReduxHandler = $require('lib/responders/redux-handler')
var expressErrHandlers = $require('lib/responders/err-handlers')
var expressSendResponse = $require('lib/responders/send-response')

var port = serverCfg.port || 3000
var uploadsDir = serverCfg.uploadsDir

var requestLogger = $require('lib/middleware/request-logger')()

module.exports = function bootstrap () {
  var app = express()

  app.set('port', port)
  app.set('uploadsDir', uploadsDir)
  app.set('x-powered-by', false)
  app.set('query parser', 'extended')
  app.use(compress())

  app.set('views', path.join(process.cwd(), 'views'))
  app.set('view engine', 'hbs')

  app.use(favicon(path.join(process.cwd(), 'public/icons/favicon.ico')))

  app.set('uploadsDir', path.resolve(path.join(process.cwd(), uploadsDir)))
  app.use(multer({ dest: uploadsDir }))

  app.use(methodOverride())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(cookieParser(secretsCfg.cookie))

  app.use('/public', express.static(path.join(process.cwd(), 'public')))
  app.use('/public', express.static(path.join(process.cwd(), 'build')))
  app.use('/public/fonts', express.static(path.join(process.cwd(), 'node_modules/bootstrap-styl/fonts')))

  app.use($require('routes'))

  app.use(requestLogger)

  //return expressReduxHandler(app)
  //  .then(()=> {
  expressSendResponse(app)
  expressErrHandlers(app)

  return Promise.resolve(app)
    //})
}
