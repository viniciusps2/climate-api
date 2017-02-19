const {expect} = require('chai')
const supertest = require('supertest')

const app = require('../../app')
const Locales = require('../../api/locales/collection')
const getFixtures = require('./fixtures')

const request = supertest(app.listen())

describe('RoutesSpec', () => {
  beforeEach(function * () {
    yield Locales.remove()
    yield Locales.saveMany(getFixtures())
  })

  describe('POST /locales/search', () => {
    it('should return 200', function * () {
      let res = yield request
        .post('/locales/search')
        .expect(200)
      expect(res.body).to.be.instanceof(Array)
      expect(res.body.length).to.be.eq(2)
    })
  })
})
