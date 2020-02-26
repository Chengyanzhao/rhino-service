const mongoose = require('mongoose')
const db = require('../model/db')

exports.updateSecret = async userId => {
  const uuid = mongoose.Types.ObjectId().toHexString()
  await db.userModel.findOneAndUpdate({ userId }, { secret: uuid })
  return uuid
}
