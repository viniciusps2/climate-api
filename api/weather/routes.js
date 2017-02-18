const Router = require('koa-router')
const Weather = require('./collection')

module.exports = Router({prefix: '/weather'})

.get('/locales/:localeId', function* () {
  const {localeId} = this.params
  this.body = yield Weather.findByLocaleId(localeId)
})

.get('/', function* () {
  this.body = yield Weather.getMainWeathers()
})
