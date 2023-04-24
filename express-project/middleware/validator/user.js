const { body } = require('express-validator')
const { validate } = require('./errorBack')
const { User } = require('../../model')

exports.register = validate([
  body('username')
    .notEmpty()
    // 自定义验证的错误信息
    .withMessage('用户名不能为空')
    // 验证通过后才走下一条验证规则
    .bail()
    .isLength({ min: 3 })
    .withMessage('用户名长度不能小于3')
    .bail(),
  body('password')
    .notEmpty()
    .withMessage('密码不能为空')
    .bail()
    .isLength({ min: 6 })
    .withMessage('密码长度不能小于6')
    .bail(),
  body('email')
    .notEmpty()
    .withMessage('邮箱不能为空')
    .bail()
    .isEmail()
    .withMessage('邮箱格式不正确')
    .bail()
    // 自定义校验规则
    .custom(async (val) => {
      const emailValidate = await User.findOne({ email: val })
      if (emailValidate) {
        return Promise.reject('邮箱已被注册')
      }
      return this
    })
    .bail(),
  body('phone')
    .notEmpty()
    .withMessage('手机号码不能为空')
    .bail()
    // 自定义校验规则
    .custom(async (val) => {
      const phoneValidate = await User.findOne({ phone: val })
      if (phoneValidate?.length) {
        return Promise.reject('手机号码已被注册')
      }
    })
    .bail()
])

exports.login = validate([
  body('email')
    .notEmpty()
    .withMessage('邮箱不能为空')
    .bail()
    .isEmail()
    .withMessage('邮箱格式不正确')
    .bail()
    .custom(async (val) => {
      const emailValidate = await User.findOne({ email: val })
      if (!emailValidate) {
        return Promise.reject('邮箱未注册')
      }
    }),
  body('password')
    .notEmpty()
    .withMessage('密码不能为空')
    .bail()
    .isLength({ min: 6 })
    .withMessage('密码长度不能小于6')
    .bail()
])
