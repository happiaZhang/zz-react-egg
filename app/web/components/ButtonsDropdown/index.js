import React from 'react';
import styles from './index.scss';

class ButtonsDropdown extends React.Component {
  static defaultProps={
    style: {}
  };

  // 构造方法
  constructor(props) {
    super(props);

    this.state = {
      mouseEnterState: false, // 鼠标移入状态
      buttonsShowState: false, // 按钮组显示状态
      buttonsIndexState: true // 按钮组第一个显示状态
    };
  }

  // 鼠标点击事件
  handleClick = () => {
    this.setState({
      buttonsShowState: true,
      buttonsIndexState: true
    });
  };

  // 鼠标移入事件
  handleMouseEnter = () => {
    this.setState({
      mouseEnterState: true
    });
  };

  // 鼠标移开事件
  handleMouseLeave = () => {
    this.setState({
      mouseEnterState: false
    });
    this.timer = setTimeout(() => {
      if (this.state.mouseEnterState) {
        clearTimeout(this.timer);
        return;
      }
      this.setState({
        buttonsShowState: false
      });
    }, 250);
  };

  // 按钮组鼠标移入事件
  handleButtonMouseEnter = () => {
    this.setState({
      buttonsIndexState: false
    });
  };

  // 按钮组渲染
  buttonsRender() {
    let {buttons, buttonClick} = this.props;
    let {buttonsIndexState} = this.state;

    return buttons.map((item, index) => {
      let selectedClass = (buttonsIndexState && index === 0) ? styles.selected : '';

      return (
        <a
          key={index}
          className={selectedClass}
          onClick={() => {
            buttonClick && buttonClick(item.type);
          }}
          onMouseEnter={this.handleButtonMouseEnter}
        >{item.text}</a>
      );
    });
  }

  // 页面渲染
  render() {
    let {style} = this.props;
    let {buttonsShowState} = this.state;

    return (
      <div
        className={styles.content}
        style={style}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div className={styles.icon} onClick={this.handleClick} />
        <div className={styles.buttonlist} style={buttonsShowState ? {display: 'block'} : {}}>
          {this.buttonsRender()}
        </div>
      </div>
    );
  }
}

export default ButtonsDropdown;
