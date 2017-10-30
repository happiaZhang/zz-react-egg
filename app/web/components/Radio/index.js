import React from 'react';
import styles from './index.scss';

export default class Radio extends React.Component {
  // 构造方法
  constructor(props) {
    super(props);

    this.state = {
      checked: props.checked || false
    };
  }

  // 接收新数据
  componentWillReceiveProps(nextProps) {
    this.setState({
      checked: nextProps.checked
    });
  }

  // 点击处理
  clickHandle = () => {
    let {text, value, callback} = this.props;

    callback && callback(value || text);
  };

  // 页面渲染
  render() {
    let {text} = this.props;
    let checkedClass = this.state.checked ? styles.checked : '';

    return (
      <div className={`${styles.inputRadio} ${checkedClass}`} onClick={this.clickHandle}>
        <i className={styles.icon} /><span>{text}</span>
      </div>
    );
  }
}
