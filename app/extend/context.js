'use strict';

/**
 * context 扩展
 */
module.exports = {

  /**
   * API调用结果处理
   * @param {Object} result 返回结果
   */
  restfulResultCheck(result) {
    const {errors} = this.app.config;
    const errorMsg = result.data && result.data.errorMessage ? result.data.errorMessage : 'api error';

    // 后端接口错误
    if (result.status !== 200) {
      this.throw(errors.Api_Error, errorMsg);
    }
  },

  /**
   * 文件流输出
   * @param {Object} result 返回结果
   */
  fileStreamExport(data, filename = 'export.txt') {
    // 文件流格式设置
    this.set({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename=${filename}`
    });
    this.body = data;
  },

  //  获取主域名
  getCookieDomain(ctx) {
    const ip = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    const protocol = ctx.request.protocol;
    const hostname = ctx.request.hostname;
    if (ip.test(hostname) || hostname.indexOf('localhost') === 0) return '';
    return protocol + '://' + hostname;
  }
};
