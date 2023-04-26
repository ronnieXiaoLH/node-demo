const mongoose = require('mongoose')
const { encrypt } = require('../utils/md5')
const baseModel = require('./base')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    set: (value) => encrypt(value),
    // 查询的时候，该字段不返回
    select: false
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: null
  },
  cover: {
    type: String,
    default: null
  },
  chanelDes: {
    type: String,
    default: null
  },
  // 粉丝数量
  subscribeCount: {
    type: Number,
    default: 0
  },
  ...baseModel
})

module.exports = userSchema
