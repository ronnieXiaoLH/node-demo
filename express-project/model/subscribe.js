const mongoose = require('mongoose')
const baseModel = require('./base')

const subscribeSchema = new mongoose.Schema({
  // 用户
  user: {
    // mongodb 自动生成的 _id
    type: mongoose.ObjectId,
    required: true,
    // 关联用户模型
    ref: 'User'
  },
  // 用户
  channel: {
    // mongodb 自动生成的 _id
    type: mongoose.ObjectId,
    required: true,
    // 关联用户模型
    ref: 'User'
  },
  ...baseModel
})

module.exports = subscribeSchema
