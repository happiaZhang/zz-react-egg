export default {
  // url验证
  isURL(str) {
    return /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+$/.test(str);
  },
  // 空字符串
  isEmpty(v) {
    if (v instanceof Array) return v.length === 0;
    if (typeof v === 'object') return Object.keys(v).length === 0;
    if (typeof v === 'string') return v.trim().length === 0;
    return false;
  },
  // null or undefined
  isNil(v) {
    return v == null;
  },
  encode(obj) {
    const kvList = [];
    Object.keys(obj).forEach(k => {
      let kv = obj[k];
      if (typeof kv === 'boolean') {
        kv = kv ? 'true' : 'false';
        kvList.push(`${k}=${kv}`);
      } else if (kv instanceof Array) {
        kv.forEach(v => {
          kvList.push(`${k}=${encodeURIComponent(v)}`);
        });
      } else {
        kvList.push(`${k}=${encodeURIComponent(kv)}`);
      }
    });
    return kvList.join('&');
  },
  prefix() {
    if (!window.config) return '/icp';
    return config.basePath.backoffice_icp;
  },
  isDev() {
    return location.hostname === 'localhost' || location.hostname === '127.0.0.1';
  },
  getCookie(name) {
    const cookieArr = document.cookie.split(';');

    for (const item of cookieArr) {
      let temp = item.split('=');
      if (temp[0] === name) {
        return decodeURI(temp[1]);
      }
    }
    return '';
  }
};
