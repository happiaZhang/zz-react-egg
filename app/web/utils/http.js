import $ from 'jquery';
import tools from './tools';
import validate from './validate';

const prefix = validate.prefix();
export default {
  fetch({method = 'GET', url, data = {}}) {
    return new Promise(function(resolve, reject) {
      $.ajax({
        beforeSend: function(xhr) {
          xhr.setRequestHeader('x-csrf-token', tools.getCookie('csrfToken'));
        },
        url: prefix + url,
        data: data,
        type: method,
        dataType: 'json',
        success({code, msg, data}) {
          code ? reject(msg) : resolve(data);
        },
        error() {
          reject('网络连接失败，请稍候重试');
        }
      });
    });
  }
};
