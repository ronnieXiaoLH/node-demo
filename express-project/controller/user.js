const fs = require('fs')
const { promisify } = require('util')
const { pick } = require('lodash')
const { User, Subscribe } = require('../model')
const { createToken } = require('../utils/jwt')

const rename = promisify(fs.rename)

// 用户注册
exports.register = async (req, res) => {
  const userModel = new User(req.body)
  const dbBack = await userModel.save()
  const user = dbBack.toJSON()
  delete user.password
  res.status(201).json({ user })
}

// 用户登录
exports.login = async (req, res) => {
  let dbBack = await User.findOne(req.body)
  if (!dbBack) {
    res.status(402).json({
      error: '邮箱或者密码不正确'
    })
  }
  dbBack = dbBack.toJSON()
  dbBack.token = await createToken(dbBack)
  res.status(200).json(dbBack)
}

// 用户修改
exports.update = async (req, res) => {
  const id = req.user._id
  const dbBack = await User.findByIdAndUpdate(id, req.body, {
    new: true // 返回修改后的数据
  })
  res.json(dbBack)
}

// 用户头像上传
exports.headimg = async (req, res) => {
  // multer 上传文件时，文件内容在 req.file 上，其他参数在 req.body 上
  const file = req.file
  const arr = file.originalname.split('.')
  const fileType = arr[arr.length - 1]
  // 默认上传到 public 的文件的文件名是不带文件后缀的，需要修改文件名
  try {
    await rename(
      `public/${file.filename}`,
      `public/${file.filename}.${fileType}`
    )
    res.status(201).json({
      filepath: `${file.filename}.${fileType}`
    })
  } catch (error) {
    res.status(500).json({ error })
  }
}

// 关注用户
exports.subscribe = async (req, res) => {
  // 当前登录用户
  const userId = req.user._id
  // 要订阅的用户
  const channelId = req.params.userId
  if (userId === channelId) {
    return res.json({
      error: '不能关注自己'
    })
  }

  const record = await Subscribe.findOne({
    user: userId,
    channel: channelId
  })
  if (record) {
    res.json({
      error: '已经关注了'
    })
  } else {
    await new Subscribe({
      user: userId,
      channel: channelId
    }).save()

    // 被关注的用户，粉丝数量+1
    const user = await User.findOne({
      _id: channelId
    })
    user.subscribeCount++
    user.save()
    res.json({
      msg: '关注成功'
    })
  }
}

// 取消关注
exports.unsubscribe = async (req, res) => {
  // 当前登录用户
  const userId = req.user._id
  // 要取消关注的用户
  const channelId = req.params.userId
  if (userId === channelId) {
    return res.json({
      error: '不能取关自己'
    })
  }

  const record = await Subscribe.findOne({
    user: userId,
    channel: channelId
  })
  if (!record) {
    res.json({
      error: '未关注'
    })
  } else {
    await record.deleteOne()

    // 被关注的用户，粉丝数量-1
    const user = await User.findOne({
      _id: channelId
    })
    user.subscribeCount--
    user.save()
    res.json({
      msg: '取关成功'
    })
  }
}

// 查看用户
exports.getUser = async (req, res) => {
  // 当前用户，可以是未登录状态
  const userId = req.user._id
  // 查看的用户
  const channelId = req.params.userId

  let isSubscribe = false
  if (userId) {
    const record = await Subscribe.findOne({
      user: userId,
      channel: channelId
    })
    if (record) {
      isSubscribe = true
    }

    const dbBack = await User.findOne({
      _id: userId
    })
    // 无法往 dbBack 中新增 User model 中未声明的字段
    // dbBack.isSubscribe = isSubscribe

    res.json({
      ...pick(dbBack, ['_id', 'username', 'avatar']),
      isSubscribe,
      cover: null,
      chanelDes: null
    })
  }
}
