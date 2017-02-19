const {expect} = require('chai')

const Weather = require('../../api/weather/collection')
const getFixture = require('./fixture')

describe('weather collection spec', () => {
  beforeEach(function * () {
    yield Weather.remove()
  })

  it('should save', function * () {
    yield Weather.create(getFixture())
    const saved = yield Weather.find()
    expect(saved.length).to.be.eq(1)
    expect(saved[0].locale.id).to.be.eq(3735)
    expect(saved[0].weather[0].date).to.be.instanceof(Date)
  })

  describe('.findByLocaleId', () => {
    it('should return weathers for one locale', function * () {
      yield Weather.create(getFixture(), getFixture(2, 'SJC'))
      const res = yield Weather.findByLocaleId(2)
      expect(res.locale.name).to.be.eq('SJC')
      expect(res.weather.length).to.be.eq(6)
    })
  })

  describe('.getMainWeathers', () => {
    it('should return main locales with not more than four weather', function * () {
      yield Weather.create(getFixture(), getFixture(2, 'SJC'))
      const res = yield Weather.getMainWeathers(2)
      expect(res.length).to.be.eq(2)
      expect(res[0].weather.length).to.be.eq(4)
      expect(res[1].weather.length).to.be.eq(4)
    })
  })
})
