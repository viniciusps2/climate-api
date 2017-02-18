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
})
