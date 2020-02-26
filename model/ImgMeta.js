const mongoose = require('mongoose')

const imgMetaSchema = new mongoose.Schema({
  userId: { type: String }, // 用户id
  base: { type: String }, // 所属目录
  filename: { type: String }, // 文件名称
  size: { type: Number }, // 文件大小
  url: { type: String }, // 文件地址
  storename: { type: String }, // 上传后文件名
  width: { type: Number }, // 图片宽度
  height: { type: Number }, // 图片高度
  hash: { type: String }, // 图片hash
  deleteUrl: { type: String }, // 删除url
  path: { type: String }, // 相对地址
  tag: { type: Array }, // 标签
  submitTime: { // 上传时间
    type: Date,
    default: () => {
      return new Date()
    },
  },
}, { collection: 'ImgMeta' })
imgMetaSchema.index({ userId: 1 })
imgMetaSchema.index({ filename: 1 })

module.exports = imgMetaSchema
