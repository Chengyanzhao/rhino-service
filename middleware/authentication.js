/**
 * Created by Chengyzh at 2019.03.07
 * 验证用户身份
 */

const jwt = require('jsonwebtoken')
const config = require('../config/index')

module.exports = (req, res, next) => {
  const token = req.headers.authorization
  if (!token) {
    res.status(401).send()
  } else {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        res.status(401).send()
      } else {
        req.userId = decoded.userId
        next()
      }
    })
  }
}
