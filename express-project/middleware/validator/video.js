const { body } = require('express-validator')
const { validate } = require('./errorBack')

exports.createVideo = validate([
  body('title')
    .notEmpty()
    .withMessage('标题不能为空')
    .bail()
    .isLength({ max: 20 })
    .withMessage('用户名长度不能大于20')
    .bail(),
  body('vodVideoId').notEmpty().withMessage('上传凭证不能为空').bail()
  // body('user').notEmpty().withMessage('用户不能为空').bail()
])
