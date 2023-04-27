const redis = require('./index')

const hotInc = (setsName) => {
  return async (key, num) => {
    const data = await redis.zscore(setsName, key)
    if (data) {
      return redis.zincrby(setsName, num, key)
    }
    return redis.zadd(setsName, num, key)
  }
}

exports.videoHotInc = hotInc('videohots')

const topHots = (setsName) => {
  return async (num = 10) => {
    const sortSets = await redis.zrevrange(setsName, 0, -1, 'withscores')
    const arr = sortSets.slice(0, num * 2)
    let obj = {}
    for (let i = 0; i < arr.length - 1; i = i + 2) {
      obj[arr[i]] = arr[i + 1]
    }
    return obj
  }
}

exports.videoTopHots = topHots('videohots')
