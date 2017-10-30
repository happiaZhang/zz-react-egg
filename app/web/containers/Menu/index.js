import styles from './index.scss';
import React from 'react';
import {Link} from 'react-router-dom';

class Menu extends React.Component {
  static defaultProps = {
    links: []
  };
  // 构造方法
  constructor(props) {
    super(props);

    this.state = {
      showState: true,
      linkIndex: this.getDefalutLink()
    };
  }

  // 打开侧边栏
  handleOpen = () => {
    if (!this.state.showState) {
      this.setState({showState: true});
    }
  };

  // 关闭侧边栏
  handleClose = () => {
    if (this.state.showState) {
      this.setState({showState: false});
    }
  };

  // 导航链接点击
  handleLinkClick = (index) => {
    this.setState({linkIndex: index});
  };

  // 获取默认的link
  getDefalutLink() {
    const {links} = this.props;
    const pathname = window.location.pathname;

    for (let i = links.length - 1; i >= 0; i--) {
      if (pathname.indexOf(links[i].link) !== -1) {
        return i;
      }
    }
  }

  // 导航列表
  renderNavList(links) {
    let {linkIndex} = this.state;

    return links.map((item, index) => {
      let selectedClass = index === linkIndex ? styles.selected : '';

      return (
        <li key={index}>
          <Link
            className={selectedClass}
            to={item.link}
            onClick={this.handleLinkClick.bind(this, index)}>
            {item.text}
          </Link>
        </li>
      );
    });
  }

  // 页面渲染
  render() {
    let {links} = this.props;
    let {showState} = this.state;
    let showClass = showState ? styles.show : styles.hidden;

    return (
      <div className={`${styles.menuBox} ${showClass}`} onClick={this.handleOpen}>
        <ul className={styles.navList}>
          {this.renderNavList(links)}
        </ul>
        <a className={styles.switch} onClick={this.handleClose}>
          <i className={styles.switchIcon}>&rsaquo;</i>
        </a>
      </div>
    );
  }
}

export default Menu;
