'use strict';

let path = require('path');

let BUILD_DIR = path.resolve(__dirname, 'public');
let APP_CONTAINERS = path.resolve(__dirname, 'containers');
let APP_COMPONENTS = path.resolve(__dirname, 'components');
let APP_CONTROLLERS = path.resolve(__dirname, 'controllers');

let config = {
  entry: ["babel-polyfill", APP_CONTAINERS + '/index.js'],
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
        test : /\.js?$/,
        include : [APP_CONTAINERS, APP_COMPONENTS],
        loader : 'babel-loader'
      },
      {
        test : /\.js?$/,
        include : [APP_CONTROLLERS],
        loader : 'babel-loader',
        query : {
          babelrc: false,
          plugins: ["transform-async-to-generator"]
        }
      },
      {
        test : /\.less?/,
        include : APP_COMPONENTS,
        loader : "style-loader!css-loader!less-loader"
      }
    ]
  },
  watch: false
};

module.exports = config;
