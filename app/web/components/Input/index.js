import styles from './index.scss';
import React from 'react';

class Input extends React.Component {
  static defaultProps = {
    style: {},
    placeholder: '',
    value: '',
    warning: false,
    focusing: false
  };

  // 构造方法
  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
      focusing: props.focusing,
      warning: props.warning
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const stateKey = Object.keys(nextState).find(k => nextState[k] !== this.state[k]);
    return stateKey != null;
  }

  componentWillReceiveProps(nextProps) {
    const {value, warning} = nextProps;
    if (warning !== this.props.warning) {
      this.setState({warning});
    }
    if (value !== this.props.value) {
      this.setState({value});
    }
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
    const {style, placeholder} = this.props;
    const {focusing, warning, value} = this.state;

    let classNames = styles.inputText;
    if (focusing) classNames += ' ' + styles.focusing;
    if (warning) classNames += ' ' + styles.warning;

    return <input
      type='text'
      className={classNames}
      style={style}
      placeholder={placeholder}
      value={value}
      onFocus={this.handleFocus}
      onBlur={this.handleBlur}
      onChange={this.handleChange} />;
  }
}

export default Input;
