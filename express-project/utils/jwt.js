const jwt = require('jsonwebtoken')
const { promisify } = require('util')
const { JWT_SECRET } = require('../config/secret')
const { jwtExpiresIn } = require('../config/db')

const sign = promisify(jwt.sign)
const verify = promisify(jwt.verify)

exports.createToken = async (data) => {
  return await sign(data, JWT_SECRET, {
    expiresIn: jwtExpiresIn
  })
}

/**
 * 根据参数来动态校验用户的登录态
 * @param {boolean} required 是否需要校验用户登录态
 * @returns
 */
exports.verifyToken = (required = true) => {
  return async (req, res, next) => {
    let token = req.headers.authorization
    token = token ? token.split('Bearer ')[1] : null

    // 有 token，校验 token
    if (token) {
      try {
        const data = await verify(token, JWT_SECRET)
        if (data) {
          // 将 user 信息返回给后面的中间件使用
          req.user = data
          next()
        }
      } catch (error) {
        res.status(402).json({
          error: '无效的 token'
        })
      }
    } else {
      // 没有token，且需校验用户的登录态
      if (required) {
        res.status(402).json({
          error: '请传入 token'
        })
      } else {
        // 没有token，且不需要校验用户的登录态
        next()
      }
    }
  }
}
