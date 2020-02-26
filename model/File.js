const mongoose = require('mongoose')

const FileSchema = new mongoose.Schema({
  userId: String,
  baseDir: String,
  name: String,
  size: Number,
  mimetype: String,
  url: String,
}, { collection: 'File' })

module.exports = FileSchema
