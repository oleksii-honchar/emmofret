var webpack = require('webpack')
var path = require('path')
var stylus = require('stylus')
var srcPath = path.join(__dirname, 'src')
var ExtractTextPlugin = require("extract-text-webpack-plugin")

var stylusOpts = {
  'include css': true,
  'resolve url': stylus.resolver,
  paths: ['node_modules','node_modules/font-awesome/css','node_modules/font-awesome']
}

module.exports = {
  target: 'web',
  cache: true,
  entry: {
    'index.bundle': path.join(srcPath, 'front-end/js/index.jsx'),
    'common.bundle': [
      'backbone', 'lodash', 'jquery', 'underscore.string', 'keymirror', 'moment', 'superagent',
      'flux', 'backbone-relational',
      'react', 'react-router', 'react-bootstrap', 'react-router-bootstrap'
    ],
    'vendor.bundle': path.join(srcPath, 'vendor/js/index.js'),
  },
  resolve: {
    root: srcPath,
    extensions: ['', '.js', '.jsx', '.styl'],
    modulesDirectories: ['node_modules',
      'node_modules/font-awesome/css',
      'src', 'src/front-end/styles',
      'src/vendor/js/jquery-plugins']
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
    pathInfo: true
  },

  module: {
    loaders: [
      { test: /(\.js|\.jsx)?$/, exclude: /node_modules/, loader: 'babel?cacheDirectory' },
      //{ test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url?limit=10000' },
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract('style', 'css!stylus?' + JSON.stringify(stylusOpts))
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url?limit=10000&minetype=application/font-woff"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file"
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.wav$|\.mp3$/,
        loader: "file"
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('common.bundle', 'common.bundle.js'),
    new webpack.SourceMapDevToolPlugin({
      filename: '[name].js.map'
    }),
    new ExtractTextPlugin('[name].css', {"omit":1,"extract":true,"remove":true})
  ],
  debug: true
}