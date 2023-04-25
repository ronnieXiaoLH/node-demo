const mongoose = require('mongoose')
const baseModel = require('./base')

const videoSchema = new mongoose.Schema({
  // 标题
  title: {
    type: String,
    required: true
  },
  // 描述
  description: {
    type: String,
    required: false
  },
  // 封面
  cover: {
    type: String,
    required: false
  },
  // 阿里云视频上传凭证
  vodVideoId: {
    type: String,
    required: true
  },
  // 用户
  user: {
    // mongodb 自动生成的 _id
    type: mongoose.ObjectId,
    required: true,
    // 关联用户模型
    ref: 'User'
  },
  ...baseModel
})

module.exports = videoSchema
