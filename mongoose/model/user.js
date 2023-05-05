const mongoose = require('mongoose')
const baseModel = require('./base')

const addressSchema = new mongoose.Schema({
  name: {
    type: String,
    default: '家'
  },
  // 经度
  longitude: {
    type: String,
    default: ''
  },
  // 纬度
  latitude: {
    type: String,
    default: ''
  }
})

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    default: 18
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: [addressSchema],
  ...baseModel
})

module.exports = userSchema
