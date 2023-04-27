const mongoose = require('mongoose')
const baseModel = require('./base')

const collectSchema = new mongoose.Schema({
  // 视频
  video: {
    type: mongoose.ObjectId,
    required: true,
    ref: 'Video'
  },
  // 用户
  user: {
    type: mongoose.ObjectId,
    required: true,
    // 关联用户模型
    ref: 'User'
  },
  ...baseModel
})

module.exports = collectSchema
