const mongoose = require('mongoose')
const mongodbConnection = require('../config/index').mongodbConnection
const userSchema = require('./UserSchema')
const imgMetaSchema = require('./ImgMeta')
const FolderSchema = require('./Folder')
const FileSchema = require('./File')

const db = mongoose.createConnection(mongodbConnection, { useNewUrlParser: true })

db.on('error', (error) => {
  console.log(`mongodb connection fails: ${error.message}`)
})
db.once('open', (callback) => {
  console.log('mongodb connection successful.')
})

const imgMetaModel = db.model('imgMeta', imgMetaSchema)
const userModel = db.model('user', userSchema)
const folderModel = db.model('folder', FolderSchema)
const fileModel = db.model('file', FileSchema)

module.exports = { imgMetaModel, userModel, folderModel, fileModel }
