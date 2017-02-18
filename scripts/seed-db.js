const weatherData = require('../base/weather')
const localesData = require('../base/locales')

const Weather = require('../api/weather/collection')
const Locales = require('../api/locales/collection')

module.exports = () => {
  console.log('Seeding data into Weather and Locales collection...')
  return [
    Weather.create(weatherData),
    Locales.create(localesData)
  ]
}
