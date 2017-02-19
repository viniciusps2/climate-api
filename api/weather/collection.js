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
    this.defineIndex()
  }

  static * findByLocaleId (localeId) {
    return this
      .findOne({'locale.id': localeId})
      .select(mainFields())
      .lean()
  }

  static * getMainWeathers () {
    const weathers = yield this.find()
      .select(mainFields())
      .slice('weather', 4)
      .limit(10)
      .sort({'locale.name': 1})
      .lean()
    return weathers
  }

  defineIndex () {
    this.index({
      'locale.id': 1
    }, {name: 'findByLocaleIdIndex'})
    this.index({
      'name': 1
    }, {name: 'sortLocaleNameIndex'})
  }
}

const mainFields = () => ({
  'locale.name': 1,
  'locale.state': 1,
  'weather': 1
})

module.exports = mongoose.model('weather', wrapSchema(Weather))
