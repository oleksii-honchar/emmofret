import React from "react";
import Router from "react-router"

module.exports = (app) => {
  app.use((req, res, next) => {
    Router.run(routes, req.url, Handler => {
      let content = React.renderToString(<Handler />);
      res.render('index', { content: content });
    })
  })
}