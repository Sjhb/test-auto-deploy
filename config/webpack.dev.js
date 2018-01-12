const merge = require('webpack-merge')
const path = require('path')
const webpack = require('webpack')
const common = require('./webpack.common.js')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, '..', 'dist'),
    quiet: true
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': '"development"'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin()
  ]
})
