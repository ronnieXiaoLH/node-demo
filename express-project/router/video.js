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
router.post('/comment/:videoId', verifyToken(), videoController.comment)
router.get('/commentList/:videoId', videoController.commentList)
router.delete(
  '/comment/:videoId/:commentId',
  verifyToken(),
  videoController.delete
)
router.post('/like/:videoId', verifyToken(), videoController.like)
router.post('/dislike/:videoId', verifyToken(), videoController.dislike)
router.get('/likeList/:videoId', verifyToken(), videoController.likeList)
router.delete('/:videoId', verifyToken(), videoController.delete)
router.post('/collect/:videoId', verifyToken(), videoController.collect)
router.get('/getHots/:topNum', videoController.getHots)

module.exports = router
