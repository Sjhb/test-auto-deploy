const merge = require('webpack-merge')
const path = require('path')
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  devtool: 'source-map',
  plugins: [
    new UglifyJSPlugin({
      sourceMap: false
    }),
    new webpack.DefinePlugin({
      'process.env': '"production"'
    })
  ]
})
