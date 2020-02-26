const ResponseTypes = require('./ResponseTypes')

module.exports = class ResponseData {
  /**
   * constructor
   * @param {ResponseTypes} status 状态
   * @param {String} msg 消息
   * @param {Obj} data 数据
   */

  constructor(status = ResponseTypes.ERROR, msg = '', data) {
    this.status = status
    this.msg = msg
    this.data = data
  }

  /**
   * 设置data
   * @param {Object} data 数据
   */

  setData(data) {
    this.data = data
  }
  /**
   * 设置状态
   * @param {ResponseTypes} status 状态
   */

  setStatus(status) {
    this.status = status
  }
  /**
   * 设置消息
   * @param {String} msg 消息
   */

  setMsg(msg) {
    this.msg = msg
  }
}
