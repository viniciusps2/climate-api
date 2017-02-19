const {expect} = require('chai')

const Locales = require('../../api/locales/collection')
const getFixtures = require('./fixtures')

describe('Locales collection spec', () => {
  beforeEach(function * () {
    yield Locales.remove()
  })

  describe('.saveMany', () => {
    it('should save many', function * () {
      yield Locales.saveMany(getFixtures())
      const saved = yield Locales.find().sort({name: 1}).lean()
      expect(saved.length).to.be.eq(2)
      expect(saved[0].name).to.be.eq('Osasco')
      expect(saved[1].name).to.be.eq('São Paulo')
    })
  })

  describe('.save', () => {
    it('should strip name accents and save', function * () {
      yield Locales.save(getFixtures()[1])
      const saved = yield Locales.find().lean()
      expect(saved.length).to.be.eq(1)
      expect(saved[0].nameToSearch).to.be.eq('sao paulo')
    })
  })

  describe('.search', () => {
    beforeEach(function * () {
      yield Locales.saveMany(getFixtures())
    })

    it('should search without accents', function * () {
      const res = yield Locales.search('saõ páúl')
      expect(res.length).to.be.eq(1)
      expect(res[0].name).to.be.eq('São Paulo')
    })

    it('should search when match only name prefix', function * () {
      const res = yield Locales.search('sao p')
      expect(res.length).to.be.eq(1)
      expect(res[0].name).to.be.eq('São Paulo')
      const res2 = yield Locales.search('paulo')
      expect(res2.length).to.be.eq(0)
    })
  })
})
