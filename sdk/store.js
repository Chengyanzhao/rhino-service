const Storage = require('./qiniu/Storage')
const { accessKey, secretKey, bucket } = require('../config/qiniu')

const storage = new Storage(accessKey, secretKey, bucket)

module.exports = storage
