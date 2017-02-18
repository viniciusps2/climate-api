const Router = require('koa-router')
const Locales = require('./collection')

module.exports = Router({prefix: '/locales'})

.post('/search', function* () {
  const {name} = this.request.body
  this.body = yield Locales.search(name)
})
