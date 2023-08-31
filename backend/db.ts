import mongoose from 'mongoose'

const CONNECTION_URL = `mongodb://localhost:27017/`

mongoose.connect(CONNECTION_URL, {
  user: process.env.MONGODB_USERNAME,
  pass: process.env.MONGODB_PASSWORD,
  dbName: process.env.MONGODB_DBNAME,
  autoIndex: true,
  autoCreate: true,
})

mongoose.connection.on('connected', () => {
  console.log('Mongo has connected succesfully')
})
mongoose.connection.on('reconnected', () => {
  console.log('Mongo has reconnected')
})
mongoose.connection.on('error', error => {
  console.log('Mongo connection has an error', error)
  mongoose.disconnect()
})
mongoose.connection.on('disconnected', () => {
  console.log('Mongo connection is disconnected')
})
