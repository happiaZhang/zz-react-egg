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
  },

  /**
   * md5
   * @param {Object} obj
   */
  md5(obj) {
    const md5 = crypto.createHash('md5');

    return md5.update(obj).digest('hex');
  },

  /**
   * redis 存储
   * @param {String} key
   * @param {Object} value
   */
  async redis(key, value) {
    if (arguments.length === 2) {
      await this.ctx.app.redis.set(key, value);
    } else {
      return await this.ctx.app.redis.get(key);
    }
  },

  /**
   * 金额格式化
   * @param {String} amount 金额
   */
  amountFormat(amount) {
    const params = {
      integer: '', // 整数部分格式化数据
      decimal: '', // 小数部分数据
      srcAmount: amount, // 原始数据
    };

    const arr = ('' + amount).split('.');
    if (arr.length == 2) {
      params.integer = arr[0];
      params.decimal = arr[1];
    } else {
      params.integer = arr[0];
      params.decimal = '00';
    }

    // 整数部分格式化
    const integerTemp = params.integer; // 整数部分
    if (integerTemp.length > 3) {
      const mod = integerTemp.length % 3;
      let temp = (mod == 0 ? '' : (integerTemp.substring(0, mod)));
      for (let i = 0; i < Math.floor(integerTemp.length / 3); i++) {
        if (mod == 0 && i == 0) {
          temp += integerTemp.substring(mod + 3 * i, mod + 3 * i + 3);
        } else {
          temp += ',' + integerTemp.substring(mod + 3 * i, mod + 3 * i + 3);
        }
      }
      params.integer = temp;
    }

    params.formatAmount = `${params.integer}.${params.decimal}`;

    // 返回
    return params;
  },

  /**
   * 时间格式化
   * @param {Number} timestamp 时间戳
   * @param {String} format 时间格式
   */
  dateFormat(timestamp, format) {
    const newDate = new Date(timestamp);

    const date = {
      'M+': newDate.getMonth() + 1,
      'd+': newDate.getDate(),
      'h+': newDate.getHours(),
      'm+': newDate.getMinutes(),
      's+': newDate.getSeconds(),
      'q+': Math.floor((newDate.getMonth() + 3) / 3),
      'S+': newDate.getMilliseconds(),
    };
    if (/(y+)/i.test(format)) {
      format = format.replace(RegExp.$1, (newDate.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (const k in date) {
      if (new RegExp('(' + k + ')').test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ('00' + date[k]).substr(('' + date[k]).length));
      }
    }
    return format;
  },

};
