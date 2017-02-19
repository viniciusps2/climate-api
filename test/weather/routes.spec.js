const {expect} = require('chai')
const supertest = require('supertest')

const app = require('../../app')
const Weather = require('../../api/weather/collection')
const getFixture = require('./fixture')
const request = supertest(app.listen())

describe('RoutesSpec', () => {
  beforeEach(function * () {
    yield Weather.remove()
    yield Weather.create(getFixture())
  })

  describe('GET /weather', () => {
    it('should return 200', function * () {
      let res = yield request
        .get('/weather')
        .expect(200)
      expect(res.body).to.be.instanceof(Array)
    })
  })

  describe('GET /weather/locales/:id', () => {
    it('should return 200', function * () {
      let res = yield request
        .get('/weather/locales/3735')
        .expect(200)
      expect(res.body.locale.name).to.be.eq('Osasco')
    })
  })
})
