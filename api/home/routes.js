const Router = require('koa-router')
const project = require('../../package')

module.exports = Router()

.get('/', function* () {
  this.body = {
    status: 'SUCCESS',
    message: project.name + ' is OK'
  }
})
