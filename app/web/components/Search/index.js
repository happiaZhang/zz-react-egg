import styles from './index.scss';
import React from 'react';

class Search extends React.Component {
  static defaultProps = {
    placeholder: '',
    value: ''
  };
  // 构造方法
  constructor(props) {
    super(props);

    this.state = {
      inputShowState: false
    };
  }

  // 点击放大镜
  handleClick = () => {
    this.setState({
      inputShowState: true
    }, () => {
      this.formInput.focus();
    });
  };

  // 输入框失去焦点处理
  handleBlur = e => {
    e.preventDefault();
    let {onInputBlur} = this.props;

    if (e.target.value === '') {
      this.setState({inputShowState: false});
    }

    onInputBlur && onInputBlur(e.target.value);
  };

  // 值改变
  handleChange = e => {
    e.preventDefault();
    let {onChangeValue} = this.props;

    onChangeValue && onChangeValue(e.target.value);
  };

  // 清除值
  handleClearClick = () => {
    let {onChangeValue} = this.props;

    this.formInput.focus();
    onChangeValue && onChangeValue('');
  };

  // 页面渲染
  render() {
    const {placeholder, value} = this.props;
    const {inputShowState} = this.state;

    const showClass = inputShowState ? styles.show : '';

    return (
      <div className={`${styles.searchBox} ${showClass}`}>
        <i className={styles.searchIcon} onClick={this.handleClick} />
        <input
          type='text'
          className={styles.input}
          value={value}
          ref={formInput => { this.formInput = formInput; }}
          placeholder={placeholder}
          onBlur={this.handleBlur}
          onChange={this.handleChange} />
        <i className={styles.clearIcon} onClick={this.handleClearClick}>&times;</i>
      </div>
    );
  }
}

export default Search;
