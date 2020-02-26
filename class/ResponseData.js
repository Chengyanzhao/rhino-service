const Command = require('../enum/Command')
module.exports = class ResponseData {
  /**
   * 构造函数
   * @param {Command} command 状态
   * @param {String} msg 消息
   * @param {Obj} data 数据
   */
  constructor (command = Command.FAILUAR, msg = '', data) {
    this.command = command
    this.msg = msg
    this.data = data
  }

  /**
   * 设置data
   * @param {Object} data 数据
   */
  setData (data) {
    this.data = data
  }
  /**
   * 设置状态
   * @param {Command} command 状态
   */
  setStatus (command) {
    this.command = command
  }
  /**
   * 设置消息
   * @param {String} msg 消息
   */
  setMsg (msg) {
    this.msg = msg
  }
}
