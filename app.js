const koa = require('koa')
const bodyParser = require('koa-bodyparser')
const handleError = require('./lib/handle-error')
let app = koa()

  .use(bodyParser())

  .use(handleError())

  .use(require('koa-logger')())

  .use(require('kcors')({
    methods: ['POST', 'GET', 'PUT', 'DELETE']
  }))

  .use(require('./api/home/routes').routes())
  .use(require('./api/weather/routes').routes())
  .use(require('./api/locales/routes').routes())

module.exports = app
