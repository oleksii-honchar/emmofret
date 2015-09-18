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
 
<table>
 <tr>
  <td>express.js@4.13.1</td>
  <td>http server</td>
 </tr>
 <tr>
  <td>bunyan@1.4.0</td>
  <td>full featured logging</td>
 </tr>
 <tr>
  <td>mongoose@4.1.6</td>
  <td>schema based MongoDB interface</td>
 </tr>
 <tr>
  <td>mocha@2.2.5 + chai@2.3.0</td>
  <td>testing framework</td>
 </tr>
 <tr>
  <td>react@0.13.3</td>
  <td>client side virtual DOM view manipulation and rendering</td>
 </tr>
 <tr>
  <td>react-router@1.0.0-beta3</td>
  <td>universal router</td>
 </tr>
 <tr>
  <td>react-redux@1.0.1</td>
  <td>binding redux state and actions into react components</td>
 </tr>
 <tr>
  <td>react-bootstrap@0.24.3</td>
  <td>easy rendering of twitter-bootstrap elements in react style</td>
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
  <td>bootstrap@3.3.5</td>
  <td>facebook UI/UX framework</td>
 </tr>
 <tr>
  <td>babel@5.8.23</td>
  <td>ES5/6/7 polyfill</td>
 </tr>
 <tr>
  <td>webpack@1.12.1</td>
  <td>source code bundle maker</td>
 </tr>
 <tr>
  <td>konphyg@1.4.0</td>
  <td>multi environment json based app config</td>
 </tr>
</table> 

## Installation & running

```
npm i
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
pending

### Server architecture and helpers

* config - initial app config
* Logger
* CRUD
* api helpers: allowLogged
* models
* views
* responders

### Client architecture and helpers

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
