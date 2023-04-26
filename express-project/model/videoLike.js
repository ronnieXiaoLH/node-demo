const mongoose = require('mongoose')
const baseModel = require('./base')

const videoLikeSchema = new mongoose.Schema({
  // 喜欢
  like: {
    type: Number,
    enum: [1, -1],
    required: true
  },
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

module.exports = videoLikeSchema
