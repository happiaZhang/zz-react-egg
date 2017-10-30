import React from 'react';
import styles from './index.scss';

class Message extends React.Component {
  // 构造方法
  constructor(props) {
    super(props);

    this.state = {
      hide: ''
    };
  }

  // 组件加载成功
  componentDidMount() {
    const {duration, onClose, messageKey} = this.props;

    this.timerAnimation = setTimeout(() => {
      this.setState({hide: 'hide'}, () => {
        this.timerHide = setTimeout(() => {
          onClose && onClose(messageKey);
        }, 400);
      });
    }, duration * 1000);
  }

  // 组件消失
  componentWillUnmount() {
    this.timerAnimation && clearTimeout(this.timerAnimation);
    this.timerHide && clearTimeout(this.timerHide);
  }

  //  页面渲染
  render() {
    const {type, content} = this.props;
    const {hide} = this.state;

    return (
      <div className={`${styles.message} ${styles[type]} ${styles[hide]}`}>
        <i className={styles.icon} />
        <span>{content}</span>
      </div>
    );
  }
}

// 默认值
Message.defaultProps = {
  duration: 3,
  content: ''
};
export default Message;
