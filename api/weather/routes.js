const Router = require('koa-router')
const Weather = require('./collection')

module.exports = Router({prefix: '/weather'})

.get('/', function* () {
  this.body = yield Weather.find().lean()
})
