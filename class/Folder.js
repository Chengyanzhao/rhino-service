module.exports = class Folder {
  /**
   * 文件夹
   * @param {Object} FolderObject
   */
  constructor ({ userId, name, isShared }) {
    this.userId = userId
    this.name = name
    this.isShared = isShared
  }
}
