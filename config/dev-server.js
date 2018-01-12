const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')

const app = express()
const config = require('./webpack.config.js')
const compiler = webpack(config)

// 告诉xpress使用webpack-dev-middleware并使用webpack.config.js里的配置
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}))

app.listen(8080, () => {
  console.log('vue-video-player is runing on port 8080')
})
