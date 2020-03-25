const Folder = require('./Folder')
const File = require('./File')
const storage = require('./qiniu/Storage')

module.exports = {
  storage,
  Folder,
  File,
}
