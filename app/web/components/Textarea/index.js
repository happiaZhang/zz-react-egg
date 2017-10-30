import styles from './index.scss';
import React from 'react';
import validate from '../../utils/validate';

class Textarea extends React.Component {
  static defaultProps = {
    placeholder: '请输入...',
    value: ''
  };

  constructor(props) {
    super(props);
    this.isInit = true;
    this.state = {
      value: props.value
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {value} = nextState;
    return value !== this.state.value;
  }

  handleChange = (e) => {
    const value = e.target.value;
    this.setState({value});
  };

  handleFocus = () => {
    if (this.isInit) {
      this.textarea.select();
      this.isInit = false;
    }
  };

  handleBlur = () => {
    const {value} = this.state;
    const {onBlur} = this.props;
    onBlur && onBlur(value);
  };

  render() {
    const {className = '', header, placeholder, style = {}, height, width} = this.props;
    const {value} = this.state;
    if (!validate.isNil(height)) style.height = height;
    if (!validate.isNil(width)) style.width = width;

    const props = {
      ref: (ref) => (this.textarea = ref),
      style,
      placeholder,
      value,
      onChange: this.handleChange,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur
    };

    return (
      <div className={`${styles.textareaContainer} ${className}`}>
        {validate.isNil(header) ? '' : <label>{header}</label>}
        <textarea {...props} />
      </div>
    );
  }
}

export default Textarea;
