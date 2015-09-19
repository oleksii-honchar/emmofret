# EMMOFRET
---
__Full stack js boilerplate__

[![GitHub version](https://badge.fury.io/gh/aleksey-gonchar%2Femmofret.svg)](http://badge.fury.io/gh/aleksey-gonchar%2Femmofret)

__CONTENTS__:

* [Preface](#preface)
* [Installation & running](#installation--running)
* [Demo](#demo)
* [Explanation](#explanation)
    * [Server architecture and helpers](#server-architecture-and-helpers)
        * [API helpers](#api-helpers)
            * [CRUD](#crud)
            * [allowLogged](#allowLogged)
        * [Views](#views)
        * [Responders](#responders)
    * [Client architecture and helpers](#client-architecture-and-helpers)
* [Contribution](#contribution)
* [FAQ](#faq)

## Preface

The main purpose of this boiler plate is to shorten scaffolding for every new project with ready to use universal solution bundle. It can be easily extended and customized. It contains implementation of basic features such as:
 
* Server:
    * Multi environment configuration
    * Api route CRUD helpers and tests
    * [Universal](https://medium.com/@mjackson/universal-javascript-4761051b7ae9) render and component state prefetch
    * Api request logging middleware
* Client:    
    * 'Login' and 'Sign up' of users
    * Private and public section access permission check
    * Modal popup demo
    * Async api call middleware

Base technology stack consist of:
 
* node@0.12.7 
 
<table>
 <tr>
  <td>babel@5.8.23</td>
  <td>ES5/6/7 polyfill</td>
 </tr>
 <tr>
  <td>bootstrap@3.3.5</td>
  <td>facebook UI/UX framework</td>
 </tr>
 <tr>
  <td>bunyan@1.4.0</td>
  <td>full featured JSON logging</td>
 </tr>
 <tr>
  <td>express.js@4.13.1</td>
  <td>http server</td>
 </tr>
 <tr>
  <td>[konphyg](https://www.npmjs.com/package/konphyg)@1.4.0</td>
  <td>multi environment json based app config</td>
 </tr>
 <tr>
  <td>mocha@2.2.5 + chai@2.3.0</td>
  <td>testing framework</td>
 </tr>
 <tr>
  <td>mongoose@4.1.6</td>
  <td>schema based MongoDB interface</td>
 </tr>
 <tr>
  <td>react@0.13.3</td>
  <td>client side virtual DOM view manipulation and rendering</td>
 </tr>
 <tr>
  <td>react-bootstrap@0.24.3</td>
  <td>easy rendering of twitter-bootstrap elements in react style</td>
 </tr>
 <tr>
  <td>react-redux@1.0.1</td>
  <td>binding redux state and actions into react components</td>
 </tr>
 <tr>
  <td>react-router@1.0.0-beta3</td>
  <td>universal router</td>
 </tr>
 <tr>
  <td>redux@1.0.1</td>
  <td>flux implementation with single app state and reducers</td>
 </tr>
 <tr>
  <td>redux-devtools@2.1.0</td>
  <td>DX tool</td>
 </tr>
 <tr>
  <td>webpack@1.12.1</td>
  <td>source code bundle maker</td>
 </tr>
</table> 

## Installation & running

```
npm i
```

Before running server you need to create local git ignored secrets.json

```
npm run init
```

Build dev bundle and run dev server:

```
npm run build
npm start
```

Build prod bundle and run prod server:

```
npm run build-prod
npm run start-prop
```
## Demo
pending

## Explanation
Express app is wrapped in basic http server in order to be easy extended. E.g. to use sockets.
On the top of entry point `server.js` `babel/register` is included for server side render of client es6 modules in [redux-handler.js](https://github.com/aleksey-gonchar/emmofret/blob/development/lib/responders/redux-handler.js). This gave possibility to use es6 all over the server app but it was not the main purpose of this boilerplate. And now with Node.js v4 it(ES6) can be used without `babel` in general. But this is another story. 

### Server architecture and helpers
---
#### Configuration
For multi environment configuration used [konphyg](https://www.npmjs.com/package/konphyg). The key feature of this approach is to put only __difference__ in new env config file:

config/server.json

 ```json
{
  "host": "127.0.0.1",
  "port": "3020",
  "uploadsDir": "uploads/",
  "api": {
    "mountPoint":"/api"
  }
} 
 ```
 
config/server.test.json

 ```json
{
  "port": "3021"
}
 ```

Usually you will need to store different API keys somewhere. And `secrets.json` is used for this. It's git ignored by default and nothing will be committed to the repo. You need just create and update this file manually on every environment where you plan to use this app.

#### Logger
On the top of `bunyan` JSON logging module `bunyan-format` is used to make logs human friendly on dev environment. You can adjust log serializers in [logger.js](https://github.com/aleksey-gonchar/emmofret/blob/development/lib/logger.js) 

#### API helpers

##### CRUD
To make api endpoint creation easy and really fast [buildCRUD.js](https://github.com/aleksey-gonchar/emmofret/blob/development/lib/api-helpers/buildCRUD.js) helper is used. It has predefined set of mapped actions and automatically apply it for defined model:

```javascript
var apiHelpers = requireTree('../lib/api-helpers')
var User = $require('models/user')

module.exports = function (router) {
  router.use('/users', apiHelpers.buildCRUD(User))
}
```

In this example we've defined CRUD actions for `User` resource mounted on `/users` of `router` mount point.
 
Also we can disable any action and define `pre-` & `post-` filter for actions.


```javascript
var apiHelpers = requireTree('../lib/api-helpers')
var User = $require('models/user')

module.exports = function (router) {
  router.use('/users', apiHelpers.buildCRUD(User, {
    actions: {
      'pre-list': apiHelpers.allowLogged,
      'pre-retrieve': apiHelpers.allowLogged,
      'pre-patch': apiHelpers.allowLogged,
      'pre-remove': apiHelpers.allowLogged,
      update: false
    }
  }))
}
```

You can use array of functions in `pre-` and `post-`. Complete set of predefined mapping is:
 
* `create` -> `POST`
* `list`-> `GET`
* `retrieve` -> `GET /:objectId`
* `retrieve-set` -> `GET /$idListRegExp` : `/([0-9a-fA-F;]{25,256})/` reg exp used to determine object id set in query and serve it in one request and response. Usefull for `backbone` style client model organisation.
* `update` -> `PUT /:objectId`
* `remove` -> `DELETE /:objectId`
* `patch` -> `PATCH /:objectId`


__Note__: `objectId` when defined in action mapping will be availabale in `req.params.objectId`

To populate some fields of result `populate` option of `buildCRUD` is used:

```
var apiHelpers = requireTree('../lib/api-helpers')
var User = $require('models/user')

module.exports = function (router) {
  router.use('/users', apiHelpers.buildCRUD(User, {
    actions: {
      update: false
    },
    populate: ['prop1', 'prop2']
  }))
}
```
##### allowLogged helper
Binded JWT [middleware](https://github.com/aleksey-gonchar/emmofret/blob/development/routes/auth/jwt.js) automatically transforms request token to `req.session.userId` and then `allowLogged` helper check for proper user or respond with [not-authorized](https://github.com/aleksey-gonchar/emmofret/blob/development/lib/api-err-responders/not-authorized.js) error.

In this way it can be used in `pre-` hook for any non-public api's.

#### Views
Handlebars used as main template engine, but it can be easily replaced with what you want.

Main html meta tags are set via [redux-handler.js](https://github.com/aleksey-gonchar/emmofret/blob/development/lib/responders/redux-handler.js) from `package.json`

#### Responders
Every incoming request to the server passing through all the middlewares and routers. And when target route handler is defined and does his job at the end it just call `next()`. Or if some error occurs then handler will call `next(err)`. In such a way we put at the very end of middleware chain 3 main responders:

1. [redux-handler.js](https://github.com/aleksey-gonchar/emmofret/blob/development/lib/responders/redux-handler.js) - it dedicated to catch all `/app` request and serve it as `html` page with prefetched state and layout. All client side javascript loaded by reference in `head`. So it very usefull for indexing by search engines.
* [err-handlers.js](https://github.com/aleksey-gonchar/emmofret/blob/development/lib/responders/err-handlers.js) - will catch all `next(err)` calls. It mean all catched error will be processed to the client with error message.
* [send-response.js](https://github.com/aleksey-gonchar/emmofret/blob/development/lib/responders/send-response.js) - will send to client content of `res.body` as JSON with `res.code` status.

This approach give us ability to process response body trhough couple of hooks. And have only single `exit`-point from server.

To simplify common error repsonses usage there is a couple of predefined error responders which are just wrapper for specific kind of error message and status:

* [not-authorized.js](https://github.com/aleksey-gonchar/emmofret/blob/development/lib/api-err-responders/not-authorized.js)
* [not-enough-permissions.js](https://github.com/aleksey-gonchar/emmofret/blob/development/lib/api-err-responders/not-enough-permissions.js)
* [resource-not-found.js](https://github.com/aleksey-gonchar/emmofret/blob/development/lib/api-err-responders/resource-not-found.js)

For exmaple let's take a look on `allowLogged` api helper:
```javascript
var $require = require(process.cwd() + '/lib/require')
var User = $require('models/user')
var errResNotFound = require('../api-err-responders/resource-not-found')
var errResNotAuthorized = require('../api-err-responders/not-authorized')

module.exports = function allowLogged (req, res, next) {
  if (!req.session.userId) {
    return next(errResNotAuthorized())
  }

  if (!req.user) {
    User.findById(req.session.userId, function (err, user) {
      if (err) return next(err)
      if (!user) return next(errResNotFound(req.session.userId, 'User'))
      req.user = user
      next()
    })
  } else {
    next()
  }
}
```

When user is not authorized we use `not-authorized` and when there is no such user found - `resource-not-found` error responder.



### Client architecture and helpers
---
* router + routes
* app store
* constants
* containers
* helpers
* middleware


## Contribution

I was using a tons of different web sources and examples, but big redux part of this repo is based on [react-redux-universal-hot-example](https://github.com/erikras/react-redux-universal-hot-example) example.

## FAQ
###### Why EMMOFRET?
Because `E`xpress `M`ongoose `MO`ngo `F`lux `RE`act `T`witterbootstrap =8)
