import styles from './index.scss';
import React from 'react';

class Select extends React.Component {
  static defaultProps = {
    style: {},
    data: [],
    value: '',
    showLines: 5
  };
  // 构造方法
  constructor(props) {
    super(props);

    this.state = {
      listShowState: false
    };
  }

  // 选项框文字点击操作
  handleTextClick = () => {
    this.setState({listShowState: true});
  };

  // 鼠标移开事件
  handleMouseLeave = () => {
    this.setState({listShowState: false});
  };

  // 选项点击操作
  handleOptionClick = (optionValue, optionText) => {
    let {value, onChangeValue} = this.props;

    // 数据没有改变,则不执行任何操作
    if (optionValue === value) {
      // 隐藏列表
      this.setState({listShowState: false});
    } else {
      // 隐藏列表并更新状态
      this.setState({listShowState: false});

      onChangeValue && onChangeValue(optionValue);
    }
  };

  // 获取当前选择项的值
  getCurrentValue = (data, value) => {
    const item = data.find(d => d.value === value);
    return item.text || item.value;
  };

  // Select选项渲染
  renderOptions(data) {
    return data.map((item, index) => {
      return (
        <li
          key={index}
          onClick={this.handleOptionClick.bind(this, item.value, item.text)}
        >{item.text || item.value}</li>
      );
    });
  }

  // 页面渲染
  render() {
    let {type, style, data, value, showLines} = this.props;
    let {listShowState} = this.state;

    let currentValue = this.getCurrentValue(data, value); // 获取当前显示值
    let typeClass = type ? styles[type] : '';
    let focusingClass = listShowState ? styles.focusing : '';
    let listLineHeight = type === 'small' ? 24 : 35;
    let listHeight = data.length > showLines ? listLineHeight * showLines : listLineHeight * data.length;

    return (
      <div
        className={`${styles.selectBox} ${typeClass} ${focusingClass}`}
        style={style}
        onMouseLeave={this.handleMouseLeave}>
        <p className={styles.text} onClick={this.handleTextClick}>{currentValue}</p>
        <ul className={styles.list} style={{height: listHeight}}>
          {this.renderOptions(data)}
        </ul>
      </div>
    );
  }
}

export default Select;
