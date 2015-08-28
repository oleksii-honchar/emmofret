var $require = require('../require')
var _ = require('lodash')
var _s = require('underscore.string')
var express = require('express')
var applyParamsCheck = $require('lib/api-helpers/applyParamsCheck')
var errResNotFound = require('../api-err-responders/resource-not-found')

var actionsMapping = {
  'create': 'POST',
  'list': 'GET',
  'retrieve': 'GET /:objectId',
  'retrieve-set': 'GET /$idListRegExp',
  'update': 'PUT /:objectId',
  'remove': 'DELETE /:objectId',
  'patch': 'PATCH /:objectId'
}

/**
 *
 * @param Model
 * @param opts.actions - { create:false } will cause to disable POST action mapping
 * @param opts.populate - ['propName']
 * @returns {*}
 */
module.exports = function (Model, options) {
  var router = express.Router()
  options = options || {}

  var actions = {
    'GET': function (req, res, next) {
      if (!req.pattern) req.pattern = {}
      req.pattern.deleted = { $ne: true }
      var limit = parseInt(req.query.limit, 10)

      if (limit && !isNaN(limit)) {
        var paginationQuery = {}
        if (req.query.cursor) {
          paginationQuery['before'] = req.query.cursor.toString()
        }
        if (options.sort) {
          paginationQuery['sort'] = options.sort
        }
        var paginatedQuery = Model.paginate(paginationQuery)
          .where(req.pattern)
          .limit(limit)
        if (options.populate) {
          paginatedQuery.populate(options.populate)
        }

        paginatedQuery.execPagination(function (err, result) {
          if (err) return next(err)
          res.body = {
            cursor: result.before,
            limit: limit,
            items: result.results,
            total: result.thisPage
          }
          next()
        })
      } else {
        var allQuery = Model.find(req.pattern)
        if (options.populate) {
          allQuery.populate(options.populate)
        }
        if (options.sort) {
          allQuery.sort(options.sort)
        }
        allQuery.exec(function (err, models) {
          if (err) return next(err)
          res.body = models
          next()
        })
      }
    },
    'GET /:objectId': function (req, res, next) {
      req.pattern = req.pattern || {}
      req.pattern._id = req.params.objectId
      req.pattern.deleted = { $ne: true }
      Model.findOne(req.pattern, function (err, model) {
        if (err) return next(err)
        res.body = model
        if (!options.populate || !model || model.deleted) {
          return next()
        }
        model.populate(options.populate, next)
      })
    },
    'GET /$idListRegExp': function (req, res, next) {
      req.pattern = req.pattern || {}
      req.pattern._id = { $in: req.params[0].split(';') }
      req.pattern.deleted = { $ne: true }

      var query = Model.find(req.pattern)
      if (options.populate) {
        query.populate(options.populate)
      }

      query.exec(function (err, model) {
        if (err) return next(err)
        res.body = model
        next()
      })
    },
    'POST': function (req, res, next) {
      req.body.creator = req.session.userId
      transformRequestBody(req.body)
      Model.create(req.body, function (err, model) {
        if (err) return next(err)
        res.body = model
        if (!options.populate) {
          return next()
        }
        model.populate(options.populate, next)
      })
    },
    'PUT /:objectId': function (req, res, next) {
      req.pattern = req.pattern || {}
      req.pattern._id = req.params.objectId
      transformRequestBody(req.body)
      Model.findOne(req.pattern, function (err, model) {
        if (err) return next(err)
        if (!model || model.deleted) return next(errResNotFound(req.params.objectId))
        res.body = model
        res.body.set(req.body)
        res.body.save(function (err) {
          if (err) return next(err)
          if (!options.populate) {
            return next()
          }
          model.populate(options.populate, next)
        })
      })
    },
    'PATCH /:objectId': function (req, res, next) {
      req.pattern = req.pattern || {}
      req.pattern._id = req.params.objectId
      transformRequestBody(req.body)
      Model.findOne(req.pattern, function (err, model) {
        if (err) return next(err)
        if (!model || model.deleted) return next(errResNotFound(req.params.objectId))
        res.body = model
        res.body.set(req.body)
        res.body.save(function (err) {
          if (err) return next(err)
          if (!options.populate) {
            return next()
          }
          model.populate(options.populate, next)
        })
      })
    },
    'DELETE /:objectId': function (req, res, next) {
      Model.findById(req.params.objectId, function (err, model) {
        if (err) return next(err)
        if (!model) return next(errResNotFound(req.params.objectId))
        model.deleted = true
        model.save(function (err) {
          if (err) return next(err)
          res.body = model
          next()
        })
      })
    }
  }

  if (options.populate) {
    options.populate = options.populate.map(function (value) {
      if (typeof value === 'string') {
        return {
          path: value,
          match: {deleted: {$ne: true}}
        }
      }
      return value
    })
  }

  function transformRequestBody (body) {
    for (var property in Model.schema.tree) {
      var pDefinition = Model.schema.tree[property][0] || Model.schema.tree[property]
      if (body[property] && pDefinition.ref) {
        if (!Array.isArray(body[property])) {
          body[property] = body[property].id || body[property]
        } else {
          body[property] = body[property].map(function (i) {
            return i.id || i
          })
        }
      }
    }
  }

  applyParamsCheck(router)

  if (options.actions) {
    var preActions = {}
    var postActions = {}

    for (var name in options.actions) {
      var hasNoDash = !_s.include(name, '-')

      // pass: 'any': [], skip: 'pre-any' | 'post-any'
      if (_.isArray(options.actions[name]) && hasNoDash) {
        actions[actionsMapping[name]] = options.actions[name]
        continue
      }

      // replace predefined action with new one; skip: 'pre-any' | 'post-any'
      if (_.isFunction(options.actions[name]) && hasNoDash) {
        actions[actionsMapping[name]] = options.actions[name]
        continue
      }

      // deletes 'name' action if opts.actions.name === false
      if (options.actions[name] === false && hasNoDash) {
        delete actions[actionsMapping[name]]
        continue
      }

      var prefix = name.split('-').shift()
      var endings = name.split('-').pop()
      var preName = null
      var postName = null

      // setting 'name' action to be pre-* actions
      if (prefix === 'pre' && endings === '*') {
        for (preName in actions)
          preActions[preName] = _.flatten([ preActions[preName] || [], options.actions[name] ])
        continue
      }

      // setting 'name' action to be post-* actions
      if (prefix === 'post' && endings === '*') {
        for (postName in actions)
          postActions[postName] = _.flatten([ postActions[postName] || [], options.actions[name] ])
        continue
      }

      // setting pre-'name' action
      if (prefix === 'pre') {
        preName = actionsMapping[endings]
        if (!preName) throw new Error('action not found ' + name)
        preActions[preName] = _.flatten([ preActions[preName] || [], options.actions[name] ])
        continue
      }

      // setting post-'name' action
      if (prefix === 'post') {
        postName = actionsMapping[endings]
        if (!postName) throw new Error('action not found ' + name)
        postActions[postName] = _.flatten([ postActions[postName] || [], options.actions[name] ])
        continue
      }
    }

    // merging all actions to one path
    for (var actionName in actions) {
      actions[actionName] = _.flatten([
        preActions[actionName] || [],
        actions[actionName],
        postActions[actionName] || []
      ])
    }
  }

  _.each(actions, function (handlers, path) {
    var pathChunks = path.split(' ')
    var method = pathChunks[0]
    var query = pathChunks[1] || '/'
    if (query === '/$idListRegExp') {
      query = /([0-9a-fA-F;]{25,256})/
    }

    router[method.toLowerCase()](query, handlers)
  })

  return router
}

module.exports.actionsMapping = actionsMapping
