const crypto = require('crypto')
const { PASSWORD_SECRET } = require('../config/secret')

exports.encrypt = (str) =>
  crypto
    .createHash('md5')
    .update(PASSWORD_SECRET + str)
    .digest('hex')
