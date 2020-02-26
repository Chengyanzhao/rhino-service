const fs = require('fs')
// const path = require('path')
const db = require('../model/db')
const Folder = require('./Folder')
const Storage = require('./qiniu/Storage')
const { accessKey, secretKey, bucket, origin } = require('../config/qiniu')
const { toObjectOpts } = require('../model/util')

const store = new Storage(accessKey, secretKey, bucket)

// const { normalizeName, getDirParamType, DIR_PARAM_TYPE } = require('./util')

const File = {
  /**
   * 后端上传文件
   * @param {*} folderId
   * @param {*} fileMeta
   * @param {*} options
   */
  async addByFile(folderId, fileMeta, options) {
    const { userId } = options
    const { name, stream, filePath, size, mimetype } = fileMeta
    // 判断文件夹是否存在
    const folderDoc = await Folder.getFolderDocById(folderId, options)
    if (!folderDoc) {
      throw new Error('文件夹不存在')
    }
    const fileDoc = new db.fileModel({
      userId,
      baseDir: folderDoc.dir,
      name,
      size,
      mimetype,
    })
    // 上传至云对象存储
    let readStream
    if (stream && stream instanceof fs.ReadStream) {
      readStream = stream
    } else if (filePath && fs.existsSync(filePath)) {
      readStream = fs.createReadStream(filePath)
    } else {
      throw new Error('file not exist!')
    }
    await store.putFile(fileDoc._id.toString(), readStream)
    fileDoc.url = `${origin}/${fileDoc._id.toString()}`
    const doc = await fileDoc.save()
    return doc.toObject(toObjectOpts)
  },

  /**
   * web上传文件
   */
  addByLink() {

  },

  /**
   * 删除文件
   * @param {String} fileId
   * @param {Object} options
   */
  async remove(fileId, options) {
    const { userId } = options
    // 判断文件是否存在
    const fileDoc = await db.fileModel.findOne({ _id: fileId, userId })
    if (!fileDoc) {
      throw new Error('文件不存在！')
    }
    const key = fileDoc.id.toString()
    await store.deleteFile(key)
    await db.fileModel.findByIdAndDelete(fileId)
  },

  rename() {

  },
}

module.exports = File
