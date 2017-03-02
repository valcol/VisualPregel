var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'public');
var APP_CONTAINERS = path.resolve(__dirname, 'containers');
var APP_COMPONENTS = path.resolve(__dirname, 'components');

var config = {
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
        test : /\.less?/,
        include : APP_COMPONENTS,
        loader : "style-loader!css-loader!less-loader"
      }
    ]
  },
  watch: false
};

module.exports = config;
