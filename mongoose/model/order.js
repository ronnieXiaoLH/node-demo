const mongoose = require('mongoose')
const baseModel = require('./base')
const User = require('./')

const orderItemSchema = new mongoose.Schema({
  order_id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  num: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    default: 18
  }
})

const orderSchema = new mongoose.Schema({
  order_id: {
    type: String,
    required: true
  },
  total_num: {
    type: Number,
    required: true
  },
  total_price: {
    type: Number,
    default: 18
  },
  user: [User],
  ...baseModel
})

module.exports = { orderSchema, orderItemSchema }
