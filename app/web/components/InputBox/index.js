import React from 'react';
import Input from '../../components/Input';
import styles from './index.scss';

export default class InputBox extends React.Component {
  // 构造方法
  constructor(props) {
    super(props);

    this.state = {
      inputValue: props.value || '',
      inputValueValid: props.valueValid || false
    };
  }

  // 接收新数据
  componentWillReceiveProps(nextProps) {
    this.setState({
      inputValue: nextProps.value,
      inputValueValid: nextProps.valueValid
    });
  }

  // 页面渲染
  render() {
    let {required, label, tips, style, inputPlaceholder, inputStyle, callback} = this.props;
    let {inputValue, inputValueValid} = this.state;
    let fromTipsShowClass = inputValueValid ? '' : styles.show;

    return (
      <div className={styles.inputBox} style={style || {}}>
        <div className={styles.label}><span>{label || ''}</span></div>
        <div>
          <Input
            value={inputValue}
            style={inputStyle || {}}
            placeholder={inputPlaceholder || ''}
            required={required || false}
            warning={inputValueValid}
            callback={(value, escape) => {
              callback && callback(value, escape);
            }}
          />
        </div>
        <div className={`${styles.formTips} ${fromTipsShowClass}`}>
          <span><i>*</i> {tips || ''}</span>
        </div>
      </div>
    );
  }
};
