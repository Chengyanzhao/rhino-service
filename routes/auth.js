const express = require('express')
const db = require('../model/db')
const modelUtil = require('../utils/modelUtil')
const encodeUtil = require('../utils/encodeUtil')
const ResponseData = require('../utils/response/ResponseData')
const ResponseTypes = require('../utils/response/ResponseTypes')
const authentication = require('../middleware/authentication')

const router = express.Router()

router.post('/login', async (req, res) => {
  const resData = new ResponseData()
  const { username, password } = req.body
  try {
    const userDoc = await db.userModel.findOne({ email: username, password })
    if (!userDoc) {
      throw new Error('用户名或密码错误！')
    }
    const token = encodeUtil.encodeToken({ payload: { userId: userDoc.userId } })
    resData.setData({
      token,
      userId: userDoc._id,
      userName: userDoc.email,
    })
    resData.setStatus(ResponseTypes.OK)
  } catch (err) {
    resData.setMsg(err.message)
    resData.setStatus(ResponseTypes.ERROR)
  } finally {
    res.json(resData)
  }
})

router.post('/logout', authentication, async (req, res) => {
  const resData = new ResponseData()
  // const { userId } = req
  try {
    resData.setStatus(ResponseTypes.OK)
  } catch (err) {
    resData.setMsg(err.message)
    resData.setStatus(ResponseTypes.ERROR)
  } finally {
    res.setHeader('token', '')
    res.json(resData)
  }
})

router.post('/register', async (req, res) => {
  const { email, password } = req.body
  // 检查邮箱是否合法
  // 用户名是否重复
  const isExist = await db.userModel.find({ email: { $exists: true } })
  if (isExist.length) {
    res.json({
      status: 'error',
      message: '此邮箱已被注册',
    })
    return
  }
  const userDoc = new db.userModel({
    userId: email,
    username: email,
    email,
    password,
  })
  await userDoc.save()
  res.json({ status: 'ok' })
})

module.exports = router
