import path from 'path'
import http from 'http'
import express from 'express'
import bodyParser from 'body-parser'
const countries = require(path.resolve(__dirname, './routes/countries.js'))

const app = express()
const server = new http.Server(app)
const io = require('socket.io')(server)

const isDeveloping = process.env.NODE_ENV !== 'production'
const port = isDeveloping ? 3000 : process.env.PORT

app.use(bodyParser.json())

app.use('/api', [
  countries
])

if (isDeveloping) {
  const webpack = require('webpack')
  const webpackMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const config = require('../client/webpack.config.js')

  app.set('json spaces', 4)

  const compiler = webpack(config)
  const middleware = webpackMiddleware(compiler, {
    noInfo: false,
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  })

  app.use(middleware)
  app.use(webpackHotMiddleware(compiler))
  app.get('*', function response (req, res) {
    res.write(middleware.fileSystem.readFileSync(path.resolve(__dirname, '../dist/index.html')))
    res.end()
  })
} else {
  app.use(express.static(path.join(__dirname, '/../dist')))
  app.get('*', function response (req, res) {
    res.sendFile(path.join(__dirname, '../dist/index.html'))
  })
}

server.listen(port, '0.0.0.0', function onStart (err2) {
  if (err2) {
    console.log(err2)
  }

  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port)
})

io.on('connection', (socket) => {
  console.log('User connection')
  socket.emit('message', JSON.stringify({
    type: 'plain',
    text: 'Hello World.'
  }))
})
