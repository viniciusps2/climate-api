const {wrap} = require('co')
const weatherData = require('../base/weather')
const localesData = require('../base/locales')

const Weather = require('../api/weather/collection')
const Locales = require('../api/locales/collection')

module.exports = wrap(function * () {
  console.log('Seeding data into Weather and Locales collection...')
  yield [
    Weather.remove(),
    Locales.remove()
  ]
  yield [
    Weather.create(weatherData),
    Locales.saveMany(localesData)
  ]
  console.log('Finish seeding.')
})
