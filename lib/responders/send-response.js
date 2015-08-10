module.exports = function sendResponse (app) {
  app.use(function (req, res, next) {
    if (res.code) {
      res.status(res.code)
    }

    if (res.template) {
      return res.render(res.template)
    }

    if (res.response || res.body) {
      if (req.accepts('json') === 'json') {
        return res.json(res.response || res.body)
      } else {
        return res.send(res.response || res.body)
      }
    }
    next()
  })
}
