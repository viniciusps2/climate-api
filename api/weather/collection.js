const wrapSchema = require('mongoose-async-class')
const mongoose = require('mongoose')
const {Schema} = mongoose

class Weather extends Schema {
  constructor () {
    super({
      period: {
        begin: Date,
        end: Date
      },
      locale: {
        id: Number,
        name: String,
        state: String,
        latitude: Number,
        longitude: Number
      },
      weather: [{
        date: Date,
        text: String,
        temperature: {
          min: Number,
          max: Number
        },
        rain: {
          probability: Number,
          precipitation: Number
        }
      }]
    })
  }

  static * findByLocaleId (localeId) {
    return this.find({'locale.id': localeId}).lean()
  }

  static * getMainWeathers () {
    const weathers = yield this.find().limit(10).sort({'locale.name': 1}).lean()
    const weatherLimited = weathers.map((weatherItem) => {
      weatherItem.weather.splice(4)
      return weatherItem
    })
    return weatherLimited
  }
}

module.exports = mongoose.model('weather', wrapSchema(Weather))
