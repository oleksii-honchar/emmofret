var mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')
var createdModifiedPlugin = require('mongoose-createdmodified').createdModifiedPlugin
var paginatorPlugin = require('mongoose-paginator')
var bcrypt = require('bcryptjs')

var saltRounds = 10
var schema = {
  email: { type: String, required: true, unique: true, lowercase: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, select: false, required: true },
  active: { type: Boolean, default: false },
  deleted: { type: Boolean, default: false }
}
var userSchema = new mongoose.Schema(schema)

userSchema.plugin(uniqueValidator, {message: '{PATH} already in use'})
userSchema.plugin(createdModifiedPlugin, {index: true})
userSchema.plugin(paginatorPlugin, {defaultKey: '_id', direction: -1, sort: 'created'})
require('./transforms/tojson')(userSchema, schema)

userSchema.path('email')
  .validate(require('./validators/email'), 'email invalid')

userSchema.pre('save', function (next) {
  var self = this

  if (!this.isModified('password')) {
    return next()
  }

  bcrypt.hash(this.password, saltRounds, function (err, passwordHash) {
    if (err) return next(err)
    self.password = passwordHash
    next()
  })
})

userSchema.static('findByCredentials', function (email, password, next) {
  var q = this.findOne({
    email: email.toLowerCase(),
    deleted: {$ne: true}
  })
  q.select('+password')
  q.exec(function (err, user) {
    if (err) return next(err)
    if (!user) return next()
    bcrypt.compare(password, user.password, function (err, passwordsMatch) {
      if (err) {
        console.error(err)
        return next() // don't pass forward errors of bcrypt
      }
      if (!passwordsMatch) return next()
      return next(err, user)
    })
  })
})

userSchema.static('findByEmail', function (email, next) {
  this.findOne({
    email: email
  }, function (err, user) {
    if (err) return next(err)
    if (!user) return next()
    next(null, user)
  })
})

userSchema.static('findByIdAndActivate', function (id, body, next) {
  this.findById(id).select('+password').exec(function (err, user) {
    if (err) return next(err)
    if (!user) return next()
    if (typeof body.password !== 'undefined') {
      user.password = body.password
    }
    user.active = true
    user.save(function (err) {
      if (err) return next(err)
      next(null, user)
    })
  })
})

userSchema.method('changePassword', function (new_password, next) {
  this.password = new_password
  this.save(function (err, user) {
    if (err) return next(err)
    next(null, user)
  })
})

module.exports = mongoose.model('User', userSchema)
