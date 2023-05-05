const mongoose = require('mongoose')

const MONGODB_CONF = {
  host: 'localhost',
  port: 27017,
  user: '',
  password: '',
  dbName: 'mongoose-demo'
}

async function main() {
  const { host, port, user, password, dbName } = MONGODB_CONF
  let url = `mongodb://${host}:${port}/${dbName}`
  if (user && password) {
    url = `mongodb://${user}:${password}@${host}:${port}/${dbName}`
  }
  await mongoose.connect(url)
}

module.exports = {
  main,
  // 数据库中的集合是带 s 的，即 Users
  User: mongoose.model('User', require('./user'))
}
