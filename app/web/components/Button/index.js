import styles from './index.scss';
import React from 'react';

class Button extends React.Component {
  static defaultProps = {
    text: 'Submit',
    type: 'primary'
  };

  // 点击处理
  handleClick = (e) => {
    e.preventDefault();
    const {onClick} = this.props;
    onClick && onClick();
  };

  // 页面渲染
  render() {
    const {text, type, disabled, loading, style} = this.props;

    let className = `${styles.button} ${styles[type]}`;
    if (loading) className += ' ' + styles.loading;
    if (disabled) className += ' ' + styles.disabled;

    return (
      <button
        type='button'
        className={className}
        style={style}
        onClick={this.handleClick}>
        {loading ? <span className={styles.loadingIcon} /> : text}
      </button>
    );
  }
}

export default Button;
