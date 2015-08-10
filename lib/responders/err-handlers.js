var log = require('../logger')

function flattenValidationError (err) {
  var errors = {}
  for (var key in err.errors) {
    if (err.errors[key].type === 'required') {
      errors[err.errors[key].path] = [err.errors[key].path + ' is required']
    } else {
      if (err.errors[key].name === 'ValidationError') {
        var nested_errors = flattenValidationError(err.errors[key])
        for (var nested_key in nested_errors)
          errors[key + '.' + nested_key] = nested_errors[nested_key]
      } else {
        errors[err.errors[key].path] = [err.errors[key].message]
      }
    }
  }
  return errors
}

module.exports = (app) => {
  app.use((req, res, next) => {
    res.status(404).json({
      error: 'Not found: ' + req.method + ' ' + req.originalUrl
    })
  })

  // mongo validation error transformation
  // note that this should be before default error handler
  app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
      var validationErrors = flattenValidationError(err)
      return res.status(422).json({errors: validationErrors})
    }

    if (err.name === 'MongoError' && err.code === 11000) {
      var parts = err.message.split('$')
      var fieldName = parts.pop().split('_').shift()
      var duplicateErrors = {}
      duplicateErrors[fieldName] = [fieldName + ' already in use']
      return res.status(422).json({errors: duplicateErrors})
    }

    next(err)
  })

  // default error handler
  app.use((err, req, res, next) => {
    err.code = err.code || 500
    if (err.code === 500) {
      log.error({err: err})
    } else {
      log.warn({err: err})
    }
    return res.status(err.code).json({error: err.message})
  })
}
