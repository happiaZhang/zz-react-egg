import React from 'react';
import styles from './index.scss';

class ButtonDropdown extends React.Component {
  static defaultProps = {
    style: {},
    buttons: []
  };

  // 构造方法
  constructor(props) {
    super(props);

    this.state = {
      mouseEnterState: false, // 鼠标移入状态
      buttonsShowState: false // 按钮组显示状态
    };
  }

  // 鼠标点击事件
  handleClick() {
    this.setState({buttonsShowState: true});
  }

  // 鼠标移入事件
  handleMouseEnter() {
    this.setState({mouseEnterState: true});
  }

  // 鼠标移开事件
  handleMouseLeave() {
    this.setState({mouseEnterState: false});
    this.timer = setTimeout(() => {
      if (this.state.mouseEnterState) {
        clearTimeout(this.timer);
        return;
      }
      this.setState({buttonsShowState: false});
    }, 250);
  }

  // 按钮组点击事件处理
  handleButtonItemClick(e, type) {
    e.preventDefault();
    let {onItemClick} = this.props;

    onItemClick && onItemClick(type);
  }

  // 按钮组渲染
  renderButtonList() {
    let {buttons} = this.props;

    return buttons.map((item, index) => {
      let warnClass = item.warn
        ? styles.warn
        : '';

      return (
        <a
          key={index}
          className={warnClass}
          onClick={(e) => {
            this.handleButtonItemClick(e, item.type);
          }}>{item.text}</a>
      );
    });
  }

  // 页面渲染
  render() {
    let {style} = this.props;
    let {buttonsShowState} = this.state;

    return (
      <div
        className={styles.buttonDropdownBox}
        style={style}
        onMouseEnter={() => {
          this.handleMouseEnter();
        }}
        onMouseLeave={() => {
          this.handleMouseLeave();
        }}>
        <div className={styles.icon}
          onClick={() => {
            this.handleClick();
          }} />
        {
          buttonsShowState &&
          <div className={styles.buttonlist}>
            {this.renderButtonList()}
          </div>
        }
      </div>
    );
  }
}

export default ButtonDropdown;
