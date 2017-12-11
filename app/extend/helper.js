'use strict';

const crypto = require('crypto');

/**
 * helper 扩展
 */
module.exports = {

  /**
   * 响应bodyjson
   * @param {Number} code 编码
   * @param {String} msg  错误信息
   * @param {Object} data 数据对象
   */
  json(code = 0, msg = '', data = null) {
    // 输出json对象
    const bodyJson = {
      code,
      msg
    };

    // body内容添加
    if (data) {
      this.ctx.body = Object.assign(bodyJson, {data});
    } else {
      this.ctx.body = bodyJson;
    }
  }
};
