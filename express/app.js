const express = require('express')
const fs = require('fs')
const path = require('path')
const { getDb, serveDb } = require('./db')

const app = express()

// 允许接收 application/x-www-form-urlencoded 格式的数据
// app.use(express.urlencoded())
// 允许接收 application/json 格式的数据
app.use(express.json())

app.get('/', async (req, res) => {
  try {
    const data = await getDb()
    res.send(data.users)
  } catch (error) {
    res.status(500).json({ error })
  }
})

app.post('/', async (req, res) => {
  try {
    if (!req.body) {
      res.status(403).json({
        msg: '用户信息为空',
      })
    }
    const data = await getDb()
    const { users } = data
    req.body.id = users[users.length - 1].id + 1
    data.users.push(req.body)
    await serveDb(JSON.stringify(data))
    res.status(200).json({
      msg: '用户添加成功',
    })
  } catch (error) {
    res.status(500).json({ error })
  }
})

app.put('/:id', async (req, res) => {
  try {
    const userInfo = await getDb()
    const userId = +req.params.id
    const user = userInfo.users.find((user) => user.id === userId)
    if (!user) {
      res.status(403).json({
        msg: '用户不存在',
      })
    }
    userInfo.users = userInfo.users.map((user) => {
      if (user.id === userId) {
        user = {
          ...user,
          ...req.body,
        }
      }
      return user
    })
    await serveDb(JSON.stringify(userInfo))
    res.status(200).json({
      msg: '用户修改成功',
    })
  } catch (error) {
    res.status(500).json({ error })
  }
})

app.listen(4000, () => {
  console.log(`Running at 127.0.0.1:4000`)
})
