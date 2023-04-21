const http = require('http')
const fs = require('fs')
const path = require('path')
const url = require('url')

const resolve = (dir) => path.resolve(__dirname, dir)

// 创建 http server 实例
const server = http.createServer()

// 监听 request
server.on('request', (req, res) => {
  // 设置响应头
  // res.setHeader('Content-Type', 'text/plain;charset=utf-8')
  // res.write('你好')

  // res.setHeader('Content-Type', 'text/html;charset=utf-8')
  // res.write('<h1>你好</h1>')

  // // 断开链接
  // res.end()

  if (req.method === 'GET') {
    // 处理 GET 请求的 url 参数
    const result = url.parse(req.url, true)
    console.log(result.query)
    if (req.url === '/') {
      fs.readFile(resolve('./index.html'), 'utf-8', (err, data) => {
        res.write(data)
        res.end()
      })
    } else {
      fs.readFile(resolve('./1.png'), (err, data) => {
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
    })

    res.end()
  }
})

server.listen(4000, () => {
  console.log(`your server running at 4000`)
})
