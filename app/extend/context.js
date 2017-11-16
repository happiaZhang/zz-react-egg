'use strict';

/**
 * context 扩展
 */
module.exports = {
  /**
   * curl 请求
   * @param {String} url
   * @param {Object} params
   * @param {String} method
   */
  async http(url, data, method = 'GET') {
    let result;
    switch (method) {
      case 'GET':
        result = await this.app.curl(url, {
          dataType: 'json',
          method,
          data
        });
        break;
      case 'POST':
        result = await this.app.curl(url, {
          dataType: 'json',
          method,
          data,
          headers: {
            'content-type': 'application/json'
          }
        });
        break;
    }

    // 后端服务请求地址
    const serverURI = `ServerURI=${url}`;
    // 客户端IP
    const clientIp = `ClientIp=${this.ip}`;
    // 客户端信息
    const userAgent = `UserAgent=${this.headers['user-agent']}`;
    // 请求body
    const requestBody = `RequestBody=${JSON.stringify(this.request.body)}`;
    // 响应body
    const responseBody = `ResponseBody=${JSON.stringify(result)}`;

    const loggerText = `${serverURI}${clientIp}${userAgent}${requestBody}${responseBody}`;
    this.app.logger.info(loggerText);

    return result;
  },
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
