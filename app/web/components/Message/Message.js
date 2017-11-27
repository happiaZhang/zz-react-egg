import React from 'react';
import styles from './index.scss';

class Message extends React.Component {
  static defaultProps = {
    duration: 3,
    content: '',
    hide: false
  };

  // 构造方法
  constructor(props) {
    super(props);

    this.state = {
      hide: props.hide
    };
  }

  // 组件加载成功
  componentDidMount() {
    const {duration, onClose, messageKey, callback} = this.props;

    if (duration) {
      this.timerAnimation = setTimeout(() => {
        this.setState({hide: true}, () => {
          this.timerHide = setTimeout(() => {
            callback && callback();
            onClose && onClose(messageKey);
          }, 400);
        });
      }, duration * 1000);
    }
  }

  // 组件消失
  componentWillUnmount() {
    this.timerAnimation && clearTimeout(this.timerAnimation);
    this.timerHide && clearTimeout(this.timerHide);
  }

  // 图标渲染
  renderIcon = () => {
    const {type} = this.props;
    let iconPath = <path d='M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 4c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zm2 8H6v-1h1V8H6V7h3v4h1v1z' />;
    if (type === 'error') iconPath = <path d='M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM5.1 13.3L3.5 12 11 2.6l1.5 1.2-7.4 9.5z' />;
    if (type === 'success') iconPath = <path d='M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM6.7 11.5L3.4 8.1l1.4-1.4 1.9 1.9 4.1-4.1 1.4 1.4-5.5 5.6z' />;
    return <svg className={`${styles.icon} ${styles[type]}`}>{iconPath}</svg>;
  };

  //  页面渲染
  render() {
    const {type, content} = this.props;
    const {hide} = this.state;
    let classNames = styles.message;
    if (type) classNames += ' ' + styles[type];
    if (hide) classNames += ' ' + styles.hide;

    return (
      <div className={classNames}>
        {this.renderIcon()}
        <span>{content}</span>
      </div>
    );
  }
}

export default Message;
