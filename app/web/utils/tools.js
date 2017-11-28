/**
 * 工具库
 */
export default {
  /**
   * 获取指定名称的cookie的值
   * @param {String} name
   */
  getCookie(name) {
    const cookieArr = document.cookie.split(';');

    for (const item of cookieArr) {
      let temp = item.split('=');
      if (temp[0] === name) {
        return unescape(temp[1]);
      }
    }
    return '';
  }
};
