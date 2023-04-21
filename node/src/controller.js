const fs = require('fs')
const path = require('path')

const resolve = (dir) => path.resolve(__dirname, dir)

module.exports = {
  index(res) {
    fs.readFile(resolve('../index.html'), 'utf-8', (err, data) => {
      res.write(data)
      res.end()
    })
  },
  user(postData, res) {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(postData))
  }
}
