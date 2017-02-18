const koa = require('koa')
const bodyParser = require('koa-bodyparser')

let app = koa()

.use(bodyParser())

.use(require('koa-logger')())

.use(require('kcors')({
  methods: ['POST', 'GET', 'PUT', 'DELETE']
}))

.use(require('./api/home/routes').routes())

.use(require('./api/weather/routes').routes())

module.exports = app
