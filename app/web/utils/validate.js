import {saveAs} from 'file-saver';

const USER_INFO_ID = '__USER_INFO__';

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
  s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
  },
  save2Xlsx(str, name) {
    saveAs(new Blob([this.s2ab(str)], {type: 'application/octet-stream'}), name + '.xlsx');
  },
  setUserInfo(data) {
    const userInfo = JSON.stringify(data);
    document.getElementById(USER_INFO_ID).value = userInfo;
  },
  getUserInfo() {
    const userInfo = document.getElementById(USER_INFO_ID).value;
    if (this.isEmpty(userInfo)) return userInfo;
    return JSON.parse(userInfo);
  },
  getCheckPerson() {
    const userInfo = this.getUserInfo();
    if (this.isEmpty(userInfo)) return 'Dev';
    return userInfo.account;
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
