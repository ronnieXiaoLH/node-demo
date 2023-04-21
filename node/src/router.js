const fs = require('fs')
const path = require('path')
const url = require('url')
const { index, user } = require('./controller')

const resolve = (dir) => path.resolve(__dirname, dir)

module.exports = (req, res) => {
  if (req.method === 'GET') {
    // 处理 GET 请求的 url 参数
    const result = url.parse(req.url, true)
    console.log(result.query)
    if (req.url === '/') {
      index(res)
    } else {
      fs.readFile(resolve('../1.png'), (err, data) => {
        res.end(data)
      })
    }
  } else if (req.method === 'POST') {
    // 处理 POST 请求的参数
    let data = ''

    // 监听数据传输事件
    req.on('data', (d) => {
      // 传递的是流数据 Buffer
      data += d
    })

    // 监听数据传输结束事件
    req.on('end', () => {
      const result = require('querystring').parse(data)
      console.log(result)
      user(result, res)
    })
  }
}
