const path = require('path')
const express = require('express')
const multer = require('multer')
const authentication = require('../middleware/authentication')
const ResponseData = require('../class/ResponseData')
const client = require('../sdk')

const upload = multer({ dest: 'uploads/' }) // 文件储存路径
const router = express.Router()

router.use(authentication)

/**
 * 上传文件
 */
router.put('/', upload.single('file'), async (req, res) => {
  const resData = new ResponseData()
  const { userId } = req
  const { folderId } = req.query
  const { file } = req
  try {
    const { originalname, size, mimetype, path: filePath } = file
    const fileMeta = {
      name: originalname,
      stream: null,
      filePath: path.join(process.cwd(), filePath),
      size,
      mimetype,
    }
    const result = await client.File.addByFile(folderId, fileMeta, { userId })
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
 * 删除文件
 */
router.delete('/:id', async (req, res) => {
  const resData = new ResponseData()
  const { userId } = req
  const { id } = req.params
  try {
    await client.File.remove(id, { userId })
    resData.setStatus(0)
  } catch (error) {
    resData.setMsg(error.message)
    resData.setStatus(-1)
  } finally {
    res.json(resData)
  }
})

module.exports = router
