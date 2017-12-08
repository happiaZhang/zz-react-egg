import React from 'react';
import styles from './index.scss';

class Warn extends React.Component {
  static defaultProps = {
    content: ''
  };

  // 页面渲染
  render() {
    const {content} = this.props;
    return (
      <div className={styles.warn}>
        {content.length === 0 ? null : <label>*</label>}
        <span>{content}</span>
      </div>
    );
  }
}

export default Warn;
