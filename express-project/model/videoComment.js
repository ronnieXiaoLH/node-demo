const mongoose = require('mongoose')
const baseModel = require('./base')

const videoCommentSchema = new mongoose.Schema({
  // 内容
  content: {
    type: String,
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

module.exports = videoCommentSchema
