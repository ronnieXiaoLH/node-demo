const { merge } = require('lodash')
const mongoose = require('mongoose')
const { main, User } = require('./model')

const ObjectId = mongoose.Types.ObjectId

async function create() {
  const username = 'zhangsan' + ((Math.random() * 1000) | 0)
  const userInfo = {
    username: username,
    age: 20 + ((Math.random() * 50) | 0),
    password: '123456',
    email: `${username}@163/com`,
    phone: '135' + ((Math.random() * Math.pow(10, 8)) | 0)
  }
  // 创建多个文档，传递数组即可
  // 第一种方式
  // const dbBack = await new User(userInfo).save()
  // 第二种方式
  const dbBack = await User.create(userInfo)
  console.log(dbBack)
}

async function update() {
  const users = await User.find()
  const user = users[0]
  if (!user) return
  const username = 'zhangsan' + ((Math.random() * 1000) | 0)
  // 第一种方式
  // const dbBack = await user.updateOne({ username })
  // 第二种方式
  // const dbBack = await User.updateOne(
  //   {
  //     username: 'zhangsan994'
  //   },
  //   { username }
  // )
  // 第三种方式
  // const dbBack = await User.updateMany(
  //   {
  //     username: new RegExp('lisi')
  //   },
  //   { username }
  // )
  // console.log(dbBack)
}

async function del() {
  const users = await User.find()
  const user = users[0]
  if (!user) return
  // 第一种方式
  // const dbBack = await user.deleteOne()
  // 第二种方式
  // const dbBack = await User.deleteOne({
  //   username: 'zhangsan220'
  // })
  // 第三种方式
  const dbBack = await User.deleteMany({
    username: new RegExp('zhangsan')
  })
  console.log(dbBack)
}

async function query() {
  let where = {}
  // 正则
  // merge(where, { username: new RegExp('zhangsan2', 'i') })
  // merge(where, {
  //   username: {
  //     $regex: 'zhangsan2'
  //   }
  // })

  // 关系运算符
  // merge(where, {
  //   age: {
  //     // 大于
  //     // $gt: 30
  //     // 大于等于
  //     // $gte: 30
  //     // 等于
  //     $eq: 30
  //     // 不等于
  //     // $ne: 30
  //     // 小于
  //     // $lt: 30
  //     // 小于等于
  //     // $lte: 30
  //   }
  // })

  // 数组
  // merge(where, {
  //   age: {
  //     // 包含
  //     // $in: [30, 36]
  //     // 不包含
  //     $nin: [30, 36]
  //   }
  // })

  // 逻辑运算符
  // merge(where, {
  //   // 逻辑与
  //   // $and: [{ username: { $regex: 'zhangsan4' } }, { age: { $gt: 30 } }]
  //   // 逻辑或
  //   // $or: [{ age: { $gt: 60 } }, { age: { $lt: 30 } }]
  //   // 逻辑非
  //   $nor: [{ age: { $gt: 60 } }, { age: { $lt: 30 } }]
  // })

  // 取模
  // merge(where, {
  //   // 模 5 余 1
  //   age: { $mod: [5, 1] }
  // })

  // TODO：区域查询

  // 数组类型字段查询
  merge(where, {
    address: { $elemMatch: { longitude: '113.905662' } }
  })

  // 默认返回文档的所有字段
  let selectObj = {
    // 1 表示要返回该字段，0 表示不返回该字段
    // 要么都是 1，要么都是 0，不可既有 0 又有 1
    // username: 1,
    // age: 1
  }
  const users = await User.find(where, selectObj)
  const count = await User.count(where)
  console.log('where', where)
  console.log('users:', users)
  console.log('count:', count)
}

async function subUpdate() {
  // 第一种方式
  // const user = await User.findById(new ObjectId('64547b1d0e9e6a149b560f15'))
  // if (!user) return
  // user.address.push({
  //   name: '家',
  //   longitude: '113.905662',
  //   latitude: '22.571913'
  // })
  // const dbBack = await user.save()

  // 第二种方式
  // const dbBack = await User.findByIdAndUpdate(
  //   new ObjectId('64547b27c1dead112f3a4b04'),
  //   {
  //     address: [
  //       {
  //         name: '公司',
  //         longitude: '113.951524',
  //         latitude: '22.543488'
  //       }
  //     ]
  //   },
  //   {
  //     new: true
  //   }
  // )

  // 第三种方式
  const dbBack = await User.updateOne(
    {
      _id: new ObjectId('64547b27c1dead112f3a4b04'),
      'address.longitude': '113.951524'
    },
    {
      $set: { 'address.$.longitude': '113.951525' } // $ 表示匹配到的数组元素
    }
  )
  console.log(dbBack)
}

main()
  .then(() => {
    console.log('mongodb 连接成功')
    // 创建文档
    // create()
    // 更新文档
    // update()
    // 删除文档
    // del()
    // 查询文档
    query()
    // 更新子文档
    // subUpdate()
  })
  .catch((err) => {
    console.log(err)
    console.log('mongodb 连接失败')
  })
