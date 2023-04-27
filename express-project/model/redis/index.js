const Redis = require('ioredis')
const { REDIS_CONF } = require('../../config/db')

const redis = new Redis(REDIS_CONF.port, REDIS_CONF.host)

redis.on('error', (err) => {
  console.log('redis 连接错误')
  console.log('err', err)
  redis.quit()
})

redis.on('ready', () => {
  console.log('redis 连接成功')
})

module.exports = redis
