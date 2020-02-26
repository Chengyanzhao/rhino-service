const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  userId: { type: String }, // 用户id
  email: { type: String }, // email
  phoneNumber: { type: String },
  weChatId: { type: String },
  password: { type: String }, // 用户登录密码
  nickname: { type: String }, // 用户昵称
}, { collection: 'user' })
userSchema.index({ userId: 1 })
userSchema.index({ email: 1 })
userSchema.index({ phoneNumber: 1 })
userSchema.index({ weChatId: 1 })

module.exports = userSchema
