import styles from './index.scss';
import React from 'react';
import {Link} from 'react-router-dom';
import {expandingContent} from '../../utils/scroller';

class Menu extends React.Component {
  static defaultProps = {
    links: []
  };
  // 构造方法
  constructor(props) {
    super(props);

    this.state = {
      expanded: true,
      activeLink: props.activeLink
    };
    this.isExpanding = false;
  }

  componentWillReceiveProps(nextProps) {
    const {activeLink} = nextProps;
    if (activeLink !== this.props.activeLink) {
      this.setState({activeLink});
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const stateKey = Object.keys(nextState).find(k => nextState[k] !== this.state[k]);
    return stateKey != null;
  }

  componentDidUpdate() {
    if (this.isExpanding) {
      const {expanded} = this.state;
      expandingContent(expanded ? 200 : 50);
      this.isExpanding = false;
    }
  }

  // 伸缩侧边栏
  onExpand = () => {
    const {expanded} = this.state;
    this.setState({expanded: !expanded});
    this.isExpanding = true;
  };

  // 导航列表
  renderNavList() {
    const {links} = this.props;
    const {activeLink} = this.state;

    return links.map((item, i) => {
      const {path, text} = item;
      const props = {
        to: path
      };
      if (path === activeLink) props.className = styles.selected;

      return (
        <li key={i}>
          <Link {...props}>{text}</Link>
        </li>
      );
    });
  }

  // 页面渲染
  render() {
    const {expanded} = this.state;
    const showClass = expanded ? styles.show : styles.hidden;

    return (
      <div className={`${styles.menuBox} ${showClass}`}>
        <ul className={styles.navList}>
          {this.renderNavList()}
        </ul>
        <a className={styles.switch} onClick={this.onExpand}>
          <i className={styles.switchIcon}>&rsaquo;</i>
        </a>
      </div>
    );
  }
}

export default Menu;
