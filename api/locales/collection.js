const wrapSchema = require('mongoose-async-class')
const mongoose = require('mongoose')
const {Schema} = mongoose

class Locale extends Schema {
  constructor () {
    super({
      id: Number,
      name: String,
      state: String,
      latitude: Number,
      longitude: Number
    })
  }

  static * search (name) {
    return this.find({name: new RegExp(name, 'i')}).lean()
  }
}

module.exports = mongoose.model('locale', wrapSchema(Locale))
