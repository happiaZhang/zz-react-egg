/**
 * 字符串验证
 */
const regex = {
  // 数字类型
  number: /^\d+$/,

  // 网址
  uri: /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+$/,

  // 国内手机号码
  mobile: /^0?(13|14|15|18)[0-9]{9}$/,

  // Email邮箱
  email: /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}$/,

  // 邮政编码
  postalcode: /^\d{6}$/,

  // IP地址
  ip: /^(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)$/,

  // 身份证
  idcard: /^\d{17}[\d|x]|\d{15}$/,

  // 金额验证
  amount: /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/
};
const stringifyPrimitive = (v) => {
  switch (typeof v) {
    case 'string':
      return v;
    case 'boolean':
      return v ? 'true' : 'false';
    case 'number':
      return isFinite(v) ? v : '';
    default:
      return '';
  }
};

export default {

  regex,

  // 空字符串
  isEmpty(str) {
    if (str.length === 0 || str === '') return true;
    return false;
  },

  // 数字类型
  isNumber(str) {
    if (str.match(regex.number)) return true;
    return false;
  },

  // 手机号码
  isMobile(str) {
    if (('' + str).match(regex.mobile)) return true;
    return false;
  },

  // 邮编
  isPostalCode(str) {
    if (str.match(regex.postalcode)) return true;
    return false;
  },

  // null or undefined
  isNil(v) {
    return v == null;
  },
  // function
  isFunction(v) {
    return typeof v === 'function';
  },
  formatData(data, key) {
    return this.isNil(data) ? '' : (window.eval(`data.${key}` || ''));
  },
  encode(obj) {
    const kvList = [];
    Object.keys(obj).forEach(k => {
      kvList.push(`${k}=${stringifyPrimitive(obj[k])}`);
    });
    return kvList.join('&');
  },
  debounce(func, delay) {
    let timeId = null;
    return () => {
      timeId && clearTimeout(timeId);
      timeId = setTimeout(func, delay)
    };
  }
};
