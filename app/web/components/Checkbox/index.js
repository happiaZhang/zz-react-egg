import styles from './index.scss';
import React from 'react';

class Checkbox extends React.Component {
  static defaultProps = {
    text: ''
  };

  // 构造方法
  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked
    };
  }

  componentWillReceiveProps(nextProps) {
    const {checked} = nextProps;
    if (checked !== this.props.checked) {
      this.setState({checked});
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {checked} = nextState;
    return checked !== this.state.checked;
  }

  // 鼠标点击事件
  handleClick = () => {
    const {onClick} = this.props;
    let {checked} = this.state;
    checked = !checked;
    onClick && onClick(checked);
  };

  // 页面渲染
  render() {
    const {text, style} = this.props;
    const {checked} = this.state;
    const checkedClass = checked ? styles.checked : '';

    return (
      <span
        className={`${styles.checkbox} ${checkedClass}`}
        style={style}
        onClick={this.handleClick}>
        <i />{text}
      </span>
    );
  }
}

export default Checkbox;
