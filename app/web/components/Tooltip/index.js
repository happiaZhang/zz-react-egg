import React from 'react';
import styles from './index.scss';

export default class Tooltip extends React.Component {
  // 页面渲染
  render() {
    let {title, text, style = {}} = this.props;

    return (
      <span className={styles.tooltip} style={style}>
        <span className={styles.title}>{title}</span>
        <div className={styles.tipContent}>
          <p className={styles.text}>{text}</p>
        </div>
      </span>
    );
  }
}
