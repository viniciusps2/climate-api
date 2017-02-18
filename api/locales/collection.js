const wrapSchema = require('mongoose-async-class')
const mongoose = require('mongoose')
const {Schema} = mongoose

class Locale extends Schema {
  constructor () {
    super({
      id: Number,
      name: String,
      nameToSearch: String,
      state: String,
      latitude: Number,
      longitude: Number
    })
  }

  static * save (locale) {
    locale.nameToSearch = stripAccents(locale.name).toLowerCase()
    return this.create(locale)
  }

  static * saveMany (locales) {
    return yield locales.map((locale) => this.save(locale))
  }

  static * search (name) {
    const nameToSearch = new RegExp('^' + stripAccents(name).toLowerCase())
    return this.find({nameToSearch}).lean()
  }
}

function stripAccents (str) {
  const accents = /[àáâãäçèéêëìíîïñòóôõöùúûüýÿÀÁÂÃÄÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÝ]/g
  const without = 'aaaaaceeeeiiiinooooouuuuyyAAAAACEEEEIIIINOOOOOUUUUY'
  return str.replace(accents, function (match) {
    return without.substr(accents.source.indexOf(match) - 1, 1)
  })
}

module.exports = mongoose.model('locale', wrapSchema(Locale))
