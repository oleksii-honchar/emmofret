var webpack = require('webpack')
var path = require('path')
var srcPath = path.join(__dirname, 'src')
var ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
  target: 'web',
  cache: true,
  entry: {
    'index.bundle': path.join(srcPath, 'front-end/js/index.js'),
    'common.bundle': [
      'lodash', 'jquery', 'underscore.string', 'keymirror', 'moment', 'superagent',
      'react', 'react-router', 'react-bootstrap', 'react-router-bootstrap',
      'redux', 'react-redux', 'redux-actions', 'js-cookie', 'lodash', 'keymirror'
    ],
    'vendor.bundle': path.join(srcPath, 'vendor/js/index.js'),
  },
  resolve: {
    root: srcPath,
    extensions: ['', '.js', '.jsx', '.scss'],
    modulesDirectories: ['node_modules',
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
      { test: /(\.js|\.jsx)$/, exclude: /node_modules/, loader: 'babel?cacheDirectory' },
      {
        test: /\.scss/,
        loader: ExtractTextPlugin.extract('style', 'css!sass')
      },
      {
        test: /\.css/,
        loader: ExtractTextPlugin.extract('style', 'css!cssnext')
      },
      {
        test: /\.less/,
        loader: ExtractTextPlugin.extract('style', 'css!less')
      },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url?limit=10000&minetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file" },

      { test: /\.jpe?g$|\.gif$|\.png$|\.wav$|\.mp3$/, loader: "file" }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: process.env.NODE_ENV === 'development'
    }),
    new webpack.optimize.CommonsChunkPlugin('common.bundle', 'common.bundle.js'),
    new webpack.SourceMapDevToolPlugin({
      filename: '[name].js.map',
      exclude: [/\.css/]
    }),
    new ExtractTextPlugin('[name].css', { allChunks: true })
  ],
  debug: true,
  cssnext: {
    browsers: 'last 2 versions'
  }
}