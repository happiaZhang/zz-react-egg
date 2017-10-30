import React from 'react';
import styles from './index.scss';

export default class OperationBtns extends React.Component {
  // 构造方法
  constructor(props) {
    super(props);

    this.state = {
      mouseEnterState: false,
      buttonGroupShow: false // 是否显示按钮组
    };
  }

  // 鼠标移进事件
  MouseEnterHandle = () => {
    this.setState({
      mouseEnterState: true
    });
  };

  // 鼠标移开操作
  mouseLeaveHandle = () => {
    this.setState({
      mouseEnterState: false
    });
    this.timer = setTimeout(() => {
      if (this.state.mouseEnterState) return;
      this.setState({
        buttonGroupShow: false
      });
    }, 250);
  };

  // 按钮组渲染
  buttonsRender() {
    let {buttons} = this.props;

    return buttons.map((item, index) => {
      return (
        <a key={index} onClick={() => {
          let {callback} = this.props;
          callback && callback(item.type);
        }}>{item.text}</a>
      );
    });
  }

  // 页面渲染
  render() {
    let {buttonGroupShow} = this.state;

    return (
      <div
        className={styles.content}
        onClick={() => { this.setState({buttonGroupShow: true}); }}
        onMouseEnter={this.MouseEnterHandle}
        onMouseLeave={this.mouseLeaveHandle}>
        <div className={styles.icon} />
        <div className={styles.operationlist} style={buttonGroupShow ? {display: 'block'} : {}}>
          {this.buttonsRender()}
        </div>
      </div>
    );
  }
}
