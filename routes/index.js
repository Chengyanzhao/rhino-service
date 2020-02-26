const express = require('express')
const router = express.Router()
const db = require('../model/db')
const Types = require('mongoose').Types

/* GET home page. */
router.get('/', (req, res, next) => {
  // res.render('index', { title: 'Express' })
  res.sendfile('./public/index.html')
})

/**
 * 获取ImgMeta
 */
router.get('/ImgMeta', async (req, res, next) => {
  let data
  const userId = req.userId
  const { id } = req.query
  try {
    const imgMetaDoc = await db.imgMetaModel.findOne({ userId, _id: Types.ObjectId(id) })
    data = imgMetaDoc.toObject()
    debugger
  } catch (err) {
    console.log(err)
    debugger
  } finally {
    res.json(data)
  }
})

/**
 * 获取ImgMeta list
 */
router.get('/ImgMete/list', async (req, res, next) => {
  let data
  const userId = req.userId
  const { start, end, skip, limit, sort } = req.query
  try {
    const query = {
      userId,
      submitTime: { $gt: start },
      submitTime: { $le: end },
    }
    const imgMetaDocList = await db.imgMetaModel.find(query).sort(sort).skip(skip).limit(limit)
    data = imgMetaDocList.map(item => item.toObject())
    debugger
  } catch (err) {
    console.log(err)
    debugger
  } finally {
    res.json(data)
  }
})

/**
 * 添加图片
 */
router.post('/ImgMeta', async (req, res, next) => {
  const userId = req.userId
  const { filename, size, url, tag } = req.body
  const imgMetaDoc = new db.imgMetaModel({
    userId,
    filename,
    size,
    url,
    tag,
  })
  try {
    const result = await imgMetaDoc.save()
    console.log(result)
    debugger
  } catch (err) {
    console.log(err)
    debugger
  } finally {
    res.json()
  }
})

/**
 * 删除图片
 */
router.delete('/ImgMeta', async (req, res, next) => {
  const userId = req.userId
  const { id } = req.body
  let removeList
  try {
    if (typeof id === 'string') {
      removeList = [id]
    } else if (Array.isArray(id)) {
      removeList = id
    } else {
      throw new Error('参数错误！')
    }
    removeList = removeList.map(item => Types.ObjectId(item))
    const result = await db.imgMetaModel.deleteMany({ userId, _id: { $in: removeList } })
    console.log(result)
    debugger
  } catch (err) {
    console.log(err)
    debugger
  } finally {
    res.json()
  }
})

module.exports = router
