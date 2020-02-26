const jwt = require('jsonwebtoken')
const config = require('../config/index')

const tokenOpts = {
  expiresIn: '7d',
}
exports.encodeToken = ({ payload, options, key = config.secret }) => {
  const opts = Object.assign({}, options, tokenOpts)
  return jwt.sign(payload, key, opts)
}
