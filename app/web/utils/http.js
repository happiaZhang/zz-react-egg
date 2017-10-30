import $ from 'jquery';
import tools from './tools';

export default {
  fetch({method = 'GET', url, data = {}}) {
    return new Promise(function(resolve, reject) {
      $.ajax({
        beforeSend: function(xhr) {
          xhr.setRequestHeader('x-csrf-token', tools.getCookie('csrfToken'));
        },
        url: url,
        data: data,
        type: method,
        dataType: 'json',
        success: resolve,
        error: reject
      });
    });
  },
  // 文件上传
  upload(url, data, success, error) {
    let formData = new FormData();
    formData.append('file', data.files[0]);
    $.ajax({
      beforeSend: (xhr) => {
        xhr.setRequestHeader('x-csrf-token', tools.getCookie('csrfToken'));
      },
      url: url,
      data: formData,
      type: 'POST',
      async: false,
      cache: false,
      contentType: false,
      processData: false,
      success: success,
      error: error
    });
  }
};
