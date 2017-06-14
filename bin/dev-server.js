var path = require('path')
var express = require('express')
var webpack = require('webpack')
var webpackConfig = require('../config/webpack.config')
var port = process.env.PORT || 3000

var app = express()
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  quiet: true
})
var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})

compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

app.use(require('connect-history-api-fallback')())
app.use(devMiddleware)
app.use(hotMiddleware)
// app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port
var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
