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
  getDomain() {
    const {protocol, hostname} = this.request;
    return protocol + '://' + hostname;
  },
  // 重定向
  redirectLogin() {
    const loginURI = `${this.getDomain()}/admin/login`;
    if (this.url.indexOf('/api') > -1) {
      this.body = {
        code: 300,
        msg: loginURI
      };
    } else {
      this.redirect(loginURI);
    }
  }
};
