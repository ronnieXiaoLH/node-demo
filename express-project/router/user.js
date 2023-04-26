const express = require('express')
const multer = require('multer')
const { userController } = require('../controller')
const validator = require('../middleware/validator/user')
const { verifyToken } = require('../utils/jwt')

const upload = multer({ dest: 'public/' })

const router = express.Router()

router.post('/registers', validator.register, userController.register)
router.post('/logins', validator.login, userController.login)
router.put('/', verifyToken(), validator.update, userController.update)
router.post(
  '/headimg',
  verifyToken(),
  upload.single('avatar'),
  userController.headimg
)
router.get('/subscribe/:userId', verifyToken(), userController.subscribe)
router.get('/unsubscribe/:userId', verifyToken(), userController.unsubscribe)

module.exports = router
