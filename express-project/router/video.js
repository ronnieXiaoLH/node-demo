const express = require('express')
const { videoController } = require('../controller')

const router = express.Router()

router.get('/list', videoController.list)

module.exports = router
