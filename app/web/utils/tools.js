/**
 * 工具库
 */
export default {
  /**
   * 时间格式化
   * @param {Number} timestamp 时间戳
   * @param {String} format 时间格式
   */
  dateFormat(timestamp, format) {
    const localDate = new Date();
    const localOffset = localDate.getTimezoneOffset() * 60000;
    const newDate = new Date(timestamp + localOffset);

    const date = {
      'M+': newDate.getMonth() + 1,
      'd+': newDate.getDate(),
      'h+': newDate.getHours(),
      'm+': newDate.getMinutes(),
      's+': newDate.getSeconds(),
      'q+': Math.floor((newDate.getMonth() + 3) / 3),
      'S+': newDate.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
      format = format.replace(RegExp.$1, (newDate.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (const k in date) {
      if (new RegExp('(' + k + ')').test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? date[k] : ('00' + date[k]).substr(('' + date[k]).length));
      }
    }
    return format;
  },

  /**
   * 获取指定名称的cookie的值
   * @param {String} name
   */
  getCookie(name) {
    const cookieArr = document.cookie.split('; ');

    for (const item of cookieArr) {
      let temp = item.split('=');
      if (temp[0] === name) {
        return unescape(temp[1]);
      }
    }
    return '';
  }
};
