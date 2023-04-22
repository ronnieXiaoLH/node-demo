const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

// 利用 promisify 将回调方式转换为 promise 方式
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

exports.getDb = async () => {
  return JSON.parse(await readFile(path.resolve(__dirname, 'db.json'), 'utf-8'))
}

exports.serveDb = async (data) => {
  return await writeFile(path.resolve(__dirname, './db.json'), data)
}
