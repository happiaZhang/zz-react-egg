import styles from './index.scss';
import React from 'react';

class MainHeader extends React.Component {
  static defaultProps = {
    title: ''
  };

  shouldComponentUpdate() {
    return false;
  }

  // 页面渲染
  render() {
    const {title, style} = this.props;

    return (
      <div className={styles.content} style={style}>
        <p className={styles.title}>{title}</p>
      </div>
    );
  }
}

export default MainHeader;
