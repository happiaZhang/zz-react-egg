import MessageGroup from './MessageGroup';
const types = {
  SUCCESS: 'success',
  INFO: 'info',
  ERROR: 'error'
};

// 消息队列实例
let instance = null;

const message = (props) => {
  instance = instance || MessageGroup.init();
  return instance.addMessage(props);
};

/**
 * 消息方法导出
 */
export default {
  // 提示消息
  info: function(content, duration) {
    return message({content, duration, type: types.INFO});
  },
  // 成功消息
  success: function(content, duration) {
    return message({content, duration, type: types.SUCCESS});
  },
  // 错误消息
  error: function(content, duration) {
    return message({content, duration, type: types.ERROR});
  },
  // 关闭消息
  close: function(messageKey) {
    instance.removeMessage(messageKey);
  }
};
