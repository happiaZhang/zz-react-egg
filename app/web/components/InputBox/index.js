import styles from './index.scss';
import React from 'react';
import Input from '../../components/Input';
import validate from '../../utils/validate';

export default class InputBox extends React.Component {
  static defaultProps = {
    style: {},
    inputStyle: {},
    inputPlaceholder: '',
    inputRequired: false,
    inputWarning: false,
    inputValue: ''
  };
  // 构造方法
  constructor(props) {
    super(props);

    this.state = {
      inputValue: props.inputValue,
      inputWarning: props.inputWarning
    };
  }

  handleChange = (inputValue) => {
    this.setState({inputValue});
  };

  // 页面渲染
  render() {
    let {style, label, inputStyle, inputPlaceholder, inputRequired} = this.props;
    let {inputValue, inputWarning} = this.state;

    return (
      <div className={styles.inputBox} style={style}>
        {validate.isNil(label) ? null : <label>{label}</label>}
        <div>
          <Input
            value={inputValue}
            warning={inputWarning}
            style={inputStyle}
            placeholder={inputPlaceholder}
            required={inputRequired}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
};
