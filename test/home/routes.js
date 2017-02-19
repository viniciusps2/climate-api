const {expect} = require('chai')
const supertest = require('supertest')

const app = require('../../app')

const request = supertest(app.listen())

describe('RoutesSpec', () => {
  describe('GET /', () => {
    it('should return 200', function * () {
      let res = yield request
        .get('/')
        .expect(200)
      expect(res.body.status).to.be.eq('SUCCESS')
    })
  })
  describe('GET /nonexistent-url', () => {
    it('should return 404', function * () {
      let res = yield request
        .get('/nonexistent')
        .expect(404)
      expect(res.body.status).to.be.eq('ERROR')
      expect(res.body.message).to.be.eq('Not Found')
    })
  })
})
