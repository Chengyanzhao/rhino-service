const mongoose = require('mongoose')

const FolderSchema = new mongoose.Schema({
  userId: String,
  dir: String,
  baseDir: String,
  name: String,
  type: String,
  isShared: Boolean,
}, { collection: 'Folder' })

module.exports = FolderSchema
