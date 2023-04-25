const express = require('express')
const { videoController, vodController } = require('../controller')
const { verifyToken } = require('../utils/jwt')
const validator = require('../middleware/validator/video')

const router = express.Router()

router.get('/getVod', verifyToken(), vodController.getVod)
router.post(
  '/createVideo',
  verifyToken(),
  validator.createVideo,
  videoController.createVideo
)
router.get('/videoList', videoController.videoList)
router.get('/video/:videoId', verifyToken(false), videoController.video)

module.exports = router
