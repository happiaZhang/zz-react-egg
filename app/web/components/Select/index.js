import styles from './index.scss';
import React from 'react';

class Select extends React.Component {
  static defaultProps = {
    style: {},
    data: [],
    value: '',
    disable: false
  };
  // 构造方法
  constructor(props) {
    super(props);

    this.state = {
      listShowState: false,
      data: [...props.data],
      value: props.value,
      disable: props.disable
    };
  }

  componentWillReceiveProps(nextProps) {
    const {data, value, disable} = nextProps;
    if (data !== this.props.data) {
      this.setState({data});
    }
    if (value !== this.props.value) {
      this.setState({value});
    }
    if (disable !== this.props.disable) {
      this.setState({disable});
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const stateKey = Object.keys(nextState).find(k => nextState[k] !== this.state[k]);
    return stateKey != null;
  }

  // 选项框文字点击操作
  handleTextClick = () => {
    const {disable} = this.state;
    if (disable) return;
    this.setState({listShowState: true});
  };

  // 鼠标移开事件
  handleMouseLeave = () => {
    this.setState({listShowState: false});
  };

  // 选项点击操作
  handleOptionClick = (optionValue, optionText) => {
    const {onChangeValue} = this.props;
    const {value} = this.state;

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
    const {type, style} = this.props;
    const {listShowState, data, value, disable} = this.state;

    const currentValue = this.getCurrentValue(data, value); // 获取当前显示值
    let classNames = styles.selectBox;
    if (type) classNames += ' ' + styles[type];
    if (listShowState) classNames += ' ' + styles.focusing;
    if (disable) classNames += ' ' + styles.disable;

    return (
      <div
        className={classNames}
        style={style}
        onMouseLeave={this.handleMouseLeave}>
        <p className={styles.text} onClick={this.handleTextClick}>{currentValue}</p>
        <ul className={styles.list}>
          {this.renderOptions(data)}
        </ul>
      </div>
    );
  }
}

export default Select;
