import React from 'react';
import ReactDOM from 'react-dom';
import Message from './Message';
import styles from './index.scss';

class MessageGroup extends React.Component {
  // 构造方法
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    };
  }

  // 添加单个message
  handleAddMessage(message) {
    const messages = [...this.state.messages];
    messages.push(message);
    this.setState({messages});
  }

  // 删除单个message
  handleRemoveMessage(messageKey) {
    const messages = this.state.messages.filter(({key}) => (messageKey !== key));
    this.setState({messages});
  }

  // 显示
  renderMessages() {
    const {messages} = this.state;

    return messages.map(item => {
      return (
        <Message
          {...item}
          messageKey={item.key}
          onClose={(messageKey) => { this.handleRemoveMessage(messageKey); }}
        />
      );
    });
  }

  // 组件渲染
  render() {
    return (
      <div className={styles.messageGroup}>
        {this.renderMessages()}
      </div>
    );
  }
}

// 生成随机Key
const getMessageKey = () => (`message_${Date.now()}`);

// 消息组初始化
MessageGroup.init = () => {
  const content = document.createElement('div');
  document.body.appendChild(content);

  // 消息队列
  const notification = ReactDOM.render(<MessageGroup />, content);

  return {
    addMessage: function(props) {
      const key = getMessageKey();
      notification.handleAddMessage({...props, key});
      return key;
    },
    removeMessage: function(key) {
      notification.handleRemoveMessage(key);
    }
  };
};

export default MessageGroup;
