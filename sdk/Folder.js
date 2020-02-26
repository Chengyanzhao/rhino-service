const path = require('path')
const db = require('../model/db')
// const File = require('./File')
const { normalizeName, getDirParamType, DIR_PARAM_TYPE } = require('./util')
const { toObjectOpts } = require('../model/util')

const BASE_DIR = '/'

const Folder = {
  listType: {
    all: 'all',
    folder: 'folder',
    file: 'file',
  },
  /**
   * 通过FolderId获取Folder Doc
   * @param {String} folderId
   * @param {Object} options
   * @return {Object} folderDoc
   */
  async getFolderDocById(folderId, options) {
    const { userId } = options
    let res
    if (folderId) {
      res = await db.folderModel.findOne({ _id: folderId, userId })
    }
    return res
  },

  async getFolderDocByDir(dir, options) {
    const { userId } = options
    let res
    if (dir) {
      res = await db.folderModel.findOne({ dir, userId })
    }
    return res
  },

  /**
   * 文件夹是否存在 by id
   * @param {String} id
   * @return {Boolean}
   */
  async isFolderExistById(id, options) {
    const { userId } = options
    const isExist = !!await db.folderModel.exists({ _id: id, userId })
    return isExist
  },

  /**
   * 文件夹是否存在 by dir
   * @param {String} dir
   * @return {Boolean}
   */
  async isFolderExistByDir(dir, options) {
    const { userId } = options
    const result = await db.folderModel.exists({ dir, userId })
    return result
  },

  async list(dir, listType, options) {
    const isHaveRoot = await Folder.isFolderExistByDir('/', options)
    if (!isHaveRoot) {
      await Folder.create('', '/', { ...options, isCreateRoot: true })
    }
    const baseFolder = await Folder.getFolderDocByDir(dir, options)
    const result = {
      baseDir: baseFolder.toObject(toObjectOpts),
    }
    let foldersPromise
    let filesPromise
    if (listType === Folder.listType.folder || listType === Folder.listType.all) {
      foldersPromise = Folder.getFolders(dir, options)
    } else if (listType === Folder.listType.file || listType === Folder.listType.all) {
      filesPromise = Folder.getFiles(dir, options)
    }
    if (foldersPromise) {
      const folderList = await foldersPromise
      result.folderList = folderList.map(item => item.toObject(toObjectOpts))
    }
    if (filesPromise) {
      const fileList = await filesPromise
      result.fileList = fileList.map(item => item.toObject(toObjectOpts))
    }
    return result
  },

  async getFolders(dir, options) {
    const { userId } = options
    const folderList = await db.folderModel.find({ baseDir: dir, userId })
    return folderList
  },

  async getFiles(dir, options) {
    const { userId } = options
    const fileList = await db.fileModel.find({ baseDir: dir, userId })
    return fileList
  },

  /**
   * 创建文件夹
   * @param {String} baseDir 基础目录
   * @param {String} name 文件夹名称
   * @param {Object} options {userId}用户Id
   */
  async create(baseDir, name, options = {}) {
    const { userId, isCreateRoot } = options
    // const folderName = name === '/' ? '全部文件' : name
    // const dirName = normalizeName(name)
    if (!isCreateRoot) {
      // 判断baseDir是否存在
      const isBaseDirExist = baseDir === BASE_DIR || Folder.isFolderExistByDir(baseDir, options)
      if (!isBaseDirExist) {
        throw new Error('操作目录不存在！')
      }
    }
    const dir = path.join(baseDir, name)
    // 判断文件夹是否已存在(直接改为可用名)
    const isRepeatName = await Folder.isFolderExistByDir(dir, options)
    if (isRepeatName) {
      throw new Error('名称已存在！')
    }
    const folderDoc = new db.folderModel({
      userId,
      dir,
      baseDir,
      name,
    })
    await folderDoc.save()
    return folderDoc
  },

  /**
   * 删除文件夹
   * @param {String} dir 文件夹全路径
   * @param {Object} options
   */
  async remove(dir, options = {}) {
    const { userId } = options
    const dirParamType = getDirParamType(dir)
    if (dirParamType === DIR_PARAM_TYPE.DIR_ID) {
      const folderId = dir
      await db.folderModel.findByIdAndDelete(folderId)
    } else {
      // TODO 删除文件夹内容。
      await db.folderModel.remove({ dir })
    }
  },

  /**
   * 重命名文件夹
   * @param {*} dir
   * @param {*} newName
   */
  async rename(dir, newName, options = {}) {
    const { userId } = options
    const dirParamType = getDirParamType(dir)
    let findPromise
    if (dirParamType === DIR_PARAM_TYPE.DIR_ID) {
      const folderId = dir
      findPromise = db.folderModel.findById(folderId).exec()
    } else {
      findPromise = db.folderModel.findOne({ dir }).exec()
    }
    const folderDoc = await findPromise
    // 文件夹不存在
    if (!folderDoc) {
      throw new Error('文件夹不存在！')
    }
    // 检查重复名
    const isRepeatName = false
    if (isRepeatName) {
      throw new Error(`已存在"${newName}"文件夹！`)
    }
    const newDir = path.join(folderDoc.baseDir, newName)
    await db.folderModel.findByIdAndUpdate(folderDoc._id, { $set: { dir: newDir, name: newName } })
  },

}

module.exports = Folder
