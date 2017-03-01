var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'public');
var APP_DIR = path.resolve(__dirname, 'views');

var config = {
  entry: ["babel-polyfill", APP_DIR + '/index.js'],
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
        test : /\.js?/,
        include : APP_DIR,
        loader : 'babel-loader'
      },
      {
        test : /\.less?/,
        include : APP_DIR,
        loader : "style-loader!css-loader!less-loader"
      }
    ]
  },
  watch: false
};

module.exports = config;
