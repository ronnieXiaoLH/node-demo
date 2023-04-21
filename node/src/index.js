const http = require('http')
const router = require('./router')

// 创建 http server 实例
const server = http.createServer()

// 监听 request
server.on('request', (req, res) => {
  router(req, res)
})

server.listen(4000, () => {
  console.log(`your server running at 4000`)
})
