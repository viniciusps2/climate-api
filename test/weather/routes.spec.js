const {expect} = require('chai')
const supertest = require('supertest')

const app = require('../../app')
const Weather = require('../../api/weather/collection')

const request = supertest(app.listen())

describe('RoutesSpec', () => {
  beforeEach(function * () {
    yield Weather.remove()
  })

  describe('GET /weather', () => {
    it('should return 200', function * () {
      let res = yield request
        .get('/weather')
        .expect(200)
      expect(res.body).to.be.instanceof(Array)
    })
  })
})
