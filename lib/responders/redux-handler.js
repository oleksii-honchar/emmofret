var React = require('react')
var Router = require('react-router')
var createStore = require('redux').createStore
var Provider = require('react-redux').Provider

//import '../../src/front-end/js/vendor-config.js'
//import AppStore from '../../src/front-end/js/store'
//import App from '../../src/front-end/js/containers/App'
//import HelloWorld from '../../src/front-end/js/components/HelloWorld.js'
//import routes from '../../src/front-end/js/routes'

var pkg = require(process.cwd() + '/package.json')

var systemJs = require('systemjs')
systemJs.transpiler = 'babel'

var reactTools = require('react-tools')

module.exports = (app) => {
  var modules = [
    //systemJs.import('src/front-end/js/vendor-config.js'),
    systemJs.import('src/front-end/js/store.js'),
    //systemJs.import('src/front-end/js/containers/App.js'),
    //systemJs.import('src/front-end/js/components/HelloWorld.js'),
    //systemJs.import('src/front-end/js/routes.js')
  ]

  return Promise.all(modules).then( (res) => {
    app.use( (req, res) => {
      var opts = {
        sourceMap: true,
        harmony: true,
        es6module: true
      }
      var App = reactTools.transform('<div>108</div>', opts)
      var html =  React.renderToString(App)

      var opts = {
        title: pkg.name,
        author: pkg.author,
        description: pkg.description,
        version: pkg.version,
        keywords: pkg.keywords.join(', '),
        html: html
      }
      res.render('index', opts)
    })
  })

  //app.use((req, res, next) => {
  //  Router.run(routes, req.url, Handler => {
  //    let content = React.renderToString(<Handler />)
      //
      //const html = React.renderToString(
      //  <Provider store={AppStore}>
      //    { () => <Handler /> }
      //  </Provider>
      //)
      //const html =  React.renderToString(<App/>)
      //
      //var opts = {
      //  title: pkg.name,
      //  author: pkg.author,
      //  description: pkg.description,
      //  version: pkg.version,
      //  keywords: pkg.keywords.join(', '),
      //  html: html
      //}
      //res.render('index', opts)
    //})
  //})

}