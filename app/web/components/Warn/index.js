import React from 'react';
import styles from './index.scss';

class Warn extends React.Component {
  static defaultProps = {
    style: {},
    text: '',
    type: '' // success notice error
  };
  // 构造方法
  constructor(props) {
    super(props);
    this.state = {
      showState: true
    };
  }

  // 关闭操作
  handleCloseClick = () => {
    this.setState({showState: false});
  };

  // 页面渲染
  render() {
    let {style, text, type} = this.props;
    let {showState} = this.state;
    let showClass = showState ? styles.show : styles.hidden;
    let typeClass = styles[type];

    return (
      <div className={`${styles.warnBox} ${typeClass} ${showClass}`} style={style}>
        <i className={styles.icon} />
        <span>{text}</span>
        <a className={styles.close} onClick={this.handleCloseClick}>&times;</a>
      </div>
    );
  }
}

export default Warn;
