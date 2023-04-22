const { MongoClient } = require('mongodb')

const url = 'mongodb://127.0.0.1:27017'
const client = new MongoClient(url)

async function getCollection(collectionName) {
  await client.connect()
  const db = client.db('demo')
  return db.collection(collectionName)
}

async function main() {
  const collection = await getCollection('user')

  // 插入一条数据
  // await collection.insertOne({ name: 'lisi', age: 20 })
  // 插入多条数据
  // await collection.insertMany([
  //   { name: 'wangwu', age: 30 },
  //   { name: 'ronnie', age: 48 },
  // ])
  // const users = await (await collection.find({})).toArray()
  // console.log(users)

  // 查询一条数据
  // const user = await collection.findOne({ name: 'ronnie' })
  // console.log(user)
  // 查询多条数据
  // const res = await (await collection.find({ age: { $gt: 20 } })).toArray()
  // console.log(res)

  // 更新一条数据
  // const res = await collection.updateOne(
  //   { name: 'ronnie' },
  //   { $set: { age: 49 } }
  // )
  // console.log(res)
  // 更新多条数据
  // const res = await collection.updateMany(
  //   { age: { $lt: 20 } },
  //   { $set: { age: 25 } }
  // )
  // console.log(res)

  // 删除一条数据
  // const res = await collection.deleteOne({ name: 'wangwu' })
  // console.log(res)
  // 删除多条数据
  const res = await collection.deleteMany({ age: { $gt: 22 } })
  console.log(res)
}

main()
  .catch((err) => {
    console.log('err', err)
  })
  .finally(() => client.close())
