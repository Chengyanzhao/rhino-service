const qiniu = require('qiniu')

const DEFAULT_TOEKN_EXPIRES = 5 * 60 // 默认上传token有效期

class Storage {
  static initConfig() {
    const config = new qiniu.conf.Config()
    // 空间对应的机房
    config.zone = qiniu.zone.Zone_z1
    // 是否使用https域名
    // config.useHttpsDomain = true
    // 上传是否使用cdn加速
    config.useCdnDomain = true
  }

  /**
   * constructor
   */
  constructor(accessKey, secretKey, bucket) {
    this.auth = {
      mac: new qiniu.auth.digest.Mac(accessKey, secretKey),
    }
    const options = { scope: bucket }
    const putPolicy = new qiniu.rs.PutPolicy(options)
    this.putPolicy = putPolicy
    // this.uploadToken = putPolicy.uploadToken(this.auth.mac)
    this.config = Storage.initConfig()
    this.bucketManager = new qiniu.rs.BucketManager(this.auth.mac, this.config)
    this.bucket = bucket
  }

  getUploadToken(expires = DEFAULT_TOEKN_EXPIRES) {
    const options = {
      scope: this.bucket,
      expires,
    }
    const putPolicy = new qiniu.rs.PutPolicy(options)
    return putPolicy.uploadToken(this.auth.mac)
  }

  putFile(key, file) {
    // TODO
    return new Promise((resolve, reject) => {
      const formUploader = new qiniu.form_up.FormUploader(this.config)
      const putExtra = new qiniu.form_up.PutExtra()
      const uploadToken = this.getUploadToken()
      formUploader.putStream(uploadToken, key, file, putExtra, (respErr, respBody, respInfo) => {
        if (respErr) {
          reject(respErr)
        }
        if (respInfo.statusCode === 200) {
          resolve(respBody)
        } else {
          debugger
          console.log(respInfo.statusCode)
          console.log(respBody)
        }
      })
    })
  }

  /**
   * 删除文件
   * @param {String}} key
   */
  deleteFile(key) {
    return new Promise((resolve, reject) => {
      this.bucketManager.delete(this.bucket, key, (err, respBody) => {
        if (err) {
          reject(err)
        } else {
          resolve(respBody)
        }
      })
    })
  }
}

module.exports = Storage
