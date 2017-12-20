import styles from './index.scss';
import React from 'react';
import Warn from '../Warn';

class Input extends React.Component {
  static defaultProps = {
    placeholder: '',
    value: '',
    warning: false,
    warningMsg: '',
    type: 'INPUT' // TEXTAREA | INPUT
  };

  // 构造方法
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      warning: props.warning
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const stateKey = Object.keys(nextState).find(k => nextState[k] !== this.state[k]);
    return stateKey != null;
  }

  componentWillReceiveProps(nextProps) {
    const {warning, value} = nextProps;
    if (warning !== this.props.warning) {
      this.setState({warning});
    }

    if (value !== this.state.value) {
      this.setState({value});
    }
  }

  // 重置数值
  resetValue = (value) => {
    this.setState({value, warning: false});
  }

  // 输入表单失去焦点
  handleBlur = (e) => {
    const value = e.target.value;
    const {onBlur} = this.props;
    onBlur && onBlur(value);
  };

  // 输入表单值改变
  handleChange = (e) => {
    const value = e.target.value;
    const {pattern} = this.props;
    this.setState({value, warning: pattern ? !pattern(value) : false});
  };

  // 页面渲染
  render() {
    const {style, placeholder, warningMsg, type, inputStyle} = this.props;
    const {warning, value} = this.state;
    const isTextarea = type === 'TEXTAREA';
    const props = {
      placeholder,
      value,
      onChange: this.handleChange,
      onBlur: this.handleBlur
    };
    if (!isTextarea) props.style = inputStyle;

    return (
      <div className={styles.inputContainer} style={style}>
        {isTextarea ? <textarea {...props} /> : <input type='text' {...props} />}
        {warning ? <Warn content={warningMsg} /> : null}
      </div>
    );
  }
}

export default Input;
