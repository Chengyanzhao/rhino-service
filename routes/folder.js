const express = require('express')
const authentication = require('../middleware/authentication')
const client = require('../sdk')
const ResponseData = require('../class/ResponseData')

const router = express.Router()
router.use(authentication)

/**
 * 获取内容列表
 * @param {string} base 基目录
 */
router.get('/', async (req, res) => {
  const resData = new ResponseData()
  const { userId } = req
  // const {baseDir}
  const { baseDir, listType } = req.query
  const folderListType = listType || client.Folder.listType.all
  try {
    const result = await client.Folder.list(baseDir, folderListType, { userId })
    resData.setData(result)
    resData.setStatus(0)
  } catch (err) {
    resData.setMsg(err.message)
    resData.setStatus(-1)
  } finally {
    res.json(resData)
  }
})

/**
 * 新建文件夹
 * @param {String} baseDir 基目录
 * @param {String} name 文件夹名称
 */
router.put('/', async (req, res) => {
  const resData = new ResponseData()
  const { userId } = req
  const { baseDir, name } = req.body
  try {
    const result = await client.Folder.create(baseDir, name, { userId })
    resData.setData(result)
    resData.setStatus(0)
  } catch (err) {
    resData.setMsg(err.message)
    resData.setStatus(-1)
  } finally {
    res.json(resData)
  }
})

/**
 * 删除文件夹
 * @param {string} base 基目录
 * @param {string} name 文件夹名称
 */
router.delete('/:id', async (req, res) => {
  const resData = new ResponseData()
  const { userId } = req
  const { id } = req.params
  try {
    await client.Folder.remove(id, { userId })
    resData.setStatus(0)
  } catch (err) {
    resData.setMsg(err.message)
    resData.setStatus(-1)
  } finally {
    res.json(resData)
  }
})

/**
 * 重命名
 * @param {string} base 基目录
 * @param {string} oldName 文件夹名称
 * @param {string} newName 新名称
 */
router.post('/:id', async (req, res, next) => {
  const resData = new ResponseData()
  const userId = req.userId
  const { id } = req.params
  const { newName } = req.body
  try {
    await client.Folder.rename(id, newName, { userId })
    resData.setStatus(0)
  } catch (err) {
    resData.setMsg(err.message)
    resData.setStatus(-1)
  } finally {
    res.json(resData)
  }
})

module.exports = router
