const express = require('express')
const { userController } = require('../controller')
const validator = require('../middleware/validator/user')
const { verifyToken } = require('../utils/jwt')

const router = express.Router()

router.post('/registers', validator.register, userController.register)
router.post('/logins', validator.login, userController.login)
router.get('/lists', verifyToken, userController.list)

module.exports = router
