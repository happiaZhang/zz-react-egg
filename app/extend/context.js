'use strict';

/**
 * context 扩展
 */
module.exports = {
  async fetch(url, opts) {
    const {host, search, method, data} = opts;
    url = `${host}${url}${search}`;
    const payload = {
      headers: {
        'content-type': 'application/json'
      },
      dataType: 'json',
      method,
      data
    };
    return this.app.curl(url, payload);
  },
  checkFetch(result) {
    const content = {
      code: 0,
      msg: null,
      data: null
    };

    if (result.status === 200) {
      content.data = result.data;
    } else {
      content.code = result.data.errorCode || '500';
      content.msg = result.data.errorMessage || 'internal server error';
    }

    return content;
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
