import styles from './index.scss';
import React from 'react';

class Notification extends React.Component {
  static defaultProps = {
    type: 'info',
    title: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      title: props.title
    };
  }

  componentWillReceiveProps(nextProps) {
    const {title} = nextProps;
    if (title !== this.props.title) {
      this.setState({title});
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {title} = nextState;
    return title !== this.state.title;
  }

  // 图标渲染
  renderIcon = () => {
    const {type} = this.props;
    let iconPath = <path d='M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 4c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zm2 8H6v-1h1V8H6V7h3v4h1v1z' />;
    if (type === 'error') iconPath = <path d='M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM5.1 13.3L3.5 12 11 2.6l1.5 1.2-7.4 9.5z' />;
    if (type === 'success') iconPath = <path d='M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM6.7 11.5L3.4 8.1l1.4-1.4 1.9 1.9 4.1-4.1 1.4 1.4-5.5 5.6z' />;
    return <svg className={styles.icon}>{iconPath}</svg>;
  };

  render() {
    const {title} = this.state;
    if (title.length === 0) return null;
    const {type, children, style} = this.props;
    return (
      <div className={`${styles.notification} ${styles[type]}`} style={style}>
        {this.renderIcon()}
        <span>{title}</span>
        {children}
      </div>
    );
  }
}

export default Notification;
