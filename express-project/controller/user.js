const fs = require('fs')
const { promisify } = require('util')
const { User } = require('../model')
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
