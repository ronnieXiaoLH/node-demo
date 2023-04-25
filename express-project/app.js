const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const router = require('./router')

const app = express()

app.use(express.json())
app.use(express.urlencoded())
app.use(cors())
app.use(morgan('dev'))
app.use(express.static('public'))

app.use('/api/v1', router)

// 404 处理
app.use((req, res) => {
  res.status(404).send('404 Not Found.')
})

// error 处理
// 4 个参数就是错误处理
app.use((err, req, res, next) => {
  // console.log(err)
  res.status(500).send('service error')
})

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`)
})
