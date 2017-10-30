import React from 'react';
import Input from '../Input';
import Button from '../Button';
import styles from './index.scss';

class Prompt extends React.Component {
  static defaultProps = {
    title: '是否确认此操作?'
  };
  // 构造方法
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    };
  }

  // 关闭点击处理
  handleCloseClick = () => {
    let {onCloseClick} = this.props;

    onCloseClick && onCloseClick();
  };

  // 文字输入
  handleInputChange = (value) => {
    this.setState({inputValue: value});
  };

  // 确认点击处理
  handleSubmitClick = () => {
    let {onSubmitClick} = this.props;
    let {inputValue} = this.state;

    onSubmitClick && onSubmitClick(inputValue);
  };

  // 页面渲染
  render() {
    let {title, placeholder, showState} = this.props;
    let {inputValue} = this.state;

    let showClass = showState
      ? ''
      : styles.hidden;

    return (
      <div className={`${styles.modalBox} ${showClass}`}>
        <div className={styles.shadow} />
        <div className={styles.container}>
          <a
            className={styles.closeBtn}
            onClick={this.handleCloseClick}>&times;</a>
          <div className={styles.content}>
            <p className={styles.title}>{title}</p>
            <Input
              style={{width: '100%'}}
              placeholder={placeholder}
              value={inputValue}
              onChange={this.handleInputChange} />
            <Button
              text='确定'
              type='primary'
              style={{width: '100%', marginTop: 20}}
              onClick={this.handleSubmitClick} />
          </div>
        </div>
      </div>
    );
  }
}

export default Prompt;
