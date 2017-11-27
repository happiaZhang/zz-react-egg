module.exports = app => {
  class Utils extends app.Service {
    async request(url, opts) {
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
      return this.ctx.curl(url, payload);
    }

    checkResponse(result) {
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
    }
  }
  return Utils;
}
