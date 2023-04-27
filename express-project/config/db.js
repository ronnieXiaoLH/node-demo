const { isProd } = require('../utils/env')

const MONGODB_CONF = {
  host: 'localhost',
  port: 27017,
  user: '',
  password: '',
  dbName: 'node-demo'
}

const jwtExpiresIn = 60 * 60

const REDIS_CONF = {
  host: 'localhost',
  port: 6379
}

if (isProd) {
  // 设置生成环境对应的配置
}

module.exports = {
  MONGODB_CONF,
  jwtExpiresIn,
  REDIS_CONF
}
