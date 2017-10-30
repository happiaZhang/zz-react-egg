/**
 * 这是一个ajax的小型库
 *
 * 可以直接调用方法get/post/request
 * 传入参数 url, options
 * return promise对象,可以直接then
 */
export default {
  _getXhr() {
    let x;
    if (window.XMLHttpRequest) {
      x = new XMLHttpRequest();
    } else {
      try {
        x = new ActiveXObject('Microsoft.XMLHTTP');
      } catch (e) {
        x = new ActiveXObject('Msxml2.XMLHTTP');
      }
    }
    return x;
  },
  _onLoadStatusChange(status, fn) {
    if (fn) fn(status);
  },
  _setTimeout(options) {
    const timeout = options.timeout ? options.timeout : 1 * 30000;
    const tId = window.setTimeout(function() {
      const x = options.xhr;
      const fn = options.onTimeout;
      x.abort();
      if (fn) fn();
    }, timeout);
    return tId;
  },
  _clearTimeout(id) {
    window.clearTimeout(id);
  },
  _resolveParam(options, type) {
    let param = '';
    const p = options.data || {};
    if (type === 'post') return p;
    if (p) {
      for (const i in p) {
        if (p[i] !== null) {
          let paramItem = p[i];
          if (typeof (paramItem) === 'object') {
            paramItem = JSON.stringify(paramItem);
          }
          param += (i + '=' + encodeURIComponent(paramItem) + '&');
        }
      }
    }
    if (param) param = param.substring(0, param.length - 1);
    return param;
  },
  /**
   * 工具方法获取指定名称的cookie的值
   * @param {string} objname
   */
  _getCookie(objname) {
    const arrstr = document.cookie.split('; ');
    for (let i = 0; i < arrstr.length; i++) {
      const temp = arrstr[i].split('=');
      if (temp[0] === objname) {
        return unescape(temp[1]);
      }
    }
    return '';
  },
  /**
   * 发送请求
   * @param {object} options
   * @param {string(get|post|null)} type
   */
  _sendRequest(options, type) {
    const curObj = this;
    const x = options.xhr;
    let u = options.url;
    const a = !(options.async != null && !options.async);
    const param = curObj._resolveParam(options, type);
    if (type === 'POST') {
      x.open(type, u, a);
      x.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      x.setRequestHeader('x-csrf-token', curObj._getCookie('csrfToken'));
    } else {
      if (param !== '') {
        u.indexOf('?') > 0 ? u = u + '&' + param : u = u + '?' + param;
      }
      x.open(type, u, true);
    }
    x.send(param);
  },
  /**
   * 监听ajax请求响应方法
   * @param {*} options
   * @return {Promise}
   */
  _resolveResult(options) {
    const curObj = this;
    const x = options.xhr;
    return new Promise((resolve, reject) => {
      x.onreadystatechange = function() {
        if (x.readyState === 4) {
          curObj._clearTimeout(options.tId);
          curObj._onLoadStatusChange('loaded', options.onStatusChange);
          if (x.status === 200) {
            try {
              resolve(JSON.parse(x.responseText));
            } catch (err) {
              resolve(x.responseText);
            }
          } else {
            // reject(x.status, x.responseText);
            reject({errCode: x.status, errMessage: x.responseText});
          }
        }
      };
    });
  },
  /**
   * 传入url，配置参数，和类型封装的ajax请求方法。
   * @param {*} url
   * @param {*} options
   * @param {*} type
   */
  _ajax(url, options, type) {
    options = options || {};
    const curObj = this;
    const t = curObj._setTimeout(options); // timdout id
    const x = curObj._getXhr();
    if (typeof url === 'object') {
      options = url;
      url = undefined;
    }
    if (typeof url === 'string') {
      options.url = url;
    }
    if (!x) {
      return;
    }
    options.xhr = x;
    curObj._onLoadStatusChange('loading', options.onStatusChange);
    options.tId = t;
    curObj._sendRequest(options, type);
    return curObj._resolveResult(options);
  },
  /**
   * 封装的get请求方法
   * @param {string} url
   * @param {object} options
   */
  get(url, options) {
    return this._ajax(url, options, 'GET');
  },
  /**
   * 封装的post请求方法
   * @param {string} url
   * @param {object} options
   */
  post(url, options) {
    return this._ajax(url, options, 'POST');
  },
  /**
   * 封装的request请求方法
   * @param {string} url
   * @param {object} options
   */
  request(url, options) {
    return this._ajax(url, options);
  }
};
