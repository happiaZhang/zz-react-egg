import styles from './index.scss';
import React from 'react';
import validate from '../../utils/validate';

class Button extends React.Component {
  static defaultProps = {
    text: 'Submit',
    type: 'primary',
    style: {}
  };

  // 构造方法
  constructor(props) {
    super(props);

    this.state = {
      loadingState: props.loadingState || false,
      disabled: props.disabled || false
    };
  }

  // 接收新的参数
  componentWillReceiveProps(nextProps) {
    this.setState({
      loadingState: nextProps.loadingState || false,
      disabled: nextProps.disabled || false
    });
  }

  // 点击处理
  handleClick = (e) => {
    e.preventDefault();
    const {onClick} = this.props;

    onClick && onClick();
  };

  // 页面渲染
  render() {
    let {text, type, style, className} = this.props;
    let {loadingState, disabled} = this.state;

    let loadingClass = loadingState ? styles.loading : '';
    let disabledClass = disabled ? styles.disabled : '';

    let classNames = `${styles.button} ${styles[type]} ${loadingClass} ${disabledClass}`;
    if (!validate.isNil(className)) classNames += ' ' + className;

    return (
      <button
        type='button'
        className={classNames}
        style={style}
        onClick={this.handleClick}>
        <span className={styles.text}>{text}</span>
        <span className={styles.loadingIcon} />
      </button>
    );
  }
}

export default Button;
