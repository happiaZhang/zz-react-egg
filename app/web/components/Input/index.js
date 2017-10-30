import React from 'react';
import styles from './index.scss';

class Input extends React.Component {
  static defaultProps = {
    style: {},
    placeholder: '',
    value: '',
    warning: false
  };

  // 构造方法
  constructor(props) {
    super(props);

    this.state = {
      focusing: false
    };
  }

  // 输入表单聚焦
  handleFocus = () => {
    this.setState({focusing: true});
  };

  // 输入表单失去焦点
  handleBlur = (e) => {
    let {onBlur} = this.props;
    this.setState({focusing: false});
    onBlur && onBlur(e.target.value);
  };

  // 输入表单值改变
  handleChange = (e) => {
    let {onChange} = this.props;

    onChange && onChange(e.target.value);
  };

  // 页面渲染
  render() {
    let {style, placeholder, value, warning} = this.props;
    let {focusing} = this.state;

    let focusingClass = focusing
      ? styles.focusing
      : '';
    let warningClass = warning
      ? styles.warning
      : '';

    return <input
      type='text'
      className={`${styles.inputText} ${focusingClass} ${warningClass}`}
      style={style}
      placeholder={placeholder}
      value={value}
      onFocus={this.handleFocus}
      onBlur={this.handleBlur}
      onChange={this.handleChange} />;
  }
}

export default Input;
