const mongoose = require('mongoose')
const { MONGODB_CONF } = require('../config/db')

async function main() {
  const { host, port, user, password, dbName } = MONGODB_CONF
  let url = `mongodb://${host}:${port}/${dbName}`
  if (user && password) {
    url = `mongodb://${user}:${password}@${host}:${port}/${dbName}`
  }
  await mongoose.connect(url)
}

main()
  .then(() => {
    console.log('mongodb 连接成功')
  })
  .catch((err) => {
    console.log(err)
    console.log('mongodb 连接失败')
  })

module.exports = {
  // 数据库中的集合是带 s 的，即 Users
  User: mongoose.model('User', require('./user')),
  Video: mongoose.model('Video', require('./video')),
  Subscribe: mongoose.model('Subscribe', require('./subscribe')),
  VideoComment: mongoose.model('VideoComment', require('./videoComment')),
  VideoLike: mongoose.model('VideoLike', require('./videoLike'))
}
