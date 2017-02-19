const mongoose = require('mongoose')

const config = {
  test: 'mongodb://localhost/climate_test',
  development: 'mongodb://localhost/climate_dev',
  production: process.env.CLIMATE_MONGODB || process.env.MONGOLAB_URI
}

const env = process.env.NODE_ENV

mongoose.Promise = Promise

mongoose.connect(config[env])

const connection = mongoose.connection

connection.once('open', () => console.info('Started mongoose connection'))
connection.on('error', (err) => console.error('Failed on mongoose', err))
connection.on('disconnected', () => console.error(`Mongoose connection disconnected`))
process.on('SIGINT', () => connection.close(() => process.exit(0)))

module.exports = connection
