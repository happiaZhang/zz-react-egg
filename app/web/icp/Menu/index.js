import styles from './index.scss';
import React from 'react';
import {Link} from 'react-router-dom';
import {flexingContent} from '../../utils/scroller';

class Menu extends React.Component {
  static defaultProps = {
    links: []
  };
  // 构造方法
  constructor(props) {
    super(props);

    this.state = {
      expanded: true,
      activeLink: props.activeLink,
      isMin: false
    };
    this.MIN_WIDTH = 840;
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

  componentDidMount() {
    this.emitter = this.handleResize;
    this.emitter();
    this.handleContentWidth();
    window.addEventListener('resize', this.emitter);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.emitter);
  }

  handleResize = () => {
    const isMin = window.innerWidth < this.MIN_WIDTH;
    if (isMin !== this.state.isMin) {
      this.setState({isMin, expanded: !isMin});
    }
  };

  componentDidUpdate() {
    this.handleContentWidth();
  }

  handleContentWidth = () => {
    const {expanded, isMin} = this.state;
    if (isMin) {
      flexingContent(50);
    } else {
      flexingContent(expanded ? 200 : 50);
    }
  };

  // 伸缩侧边栏
  onExpand = (e) => {
    e.stopPropagation();
    const {expanded} = this.state;
    this.setState({expanded: !expanded});
  };

  // 导航列表
  renderNavList() {
    const {links} = this.props;
    const {activeLink, isMin} = this.state;

    return links.map((item, i) => {
      const {path, text} = item;
      const props = {
        to: path
      };
      if (path === activeLink) {
        props.className = styles.selected;
      } else {
        if (isMin) props.onClick = this.onExpand;
      }

      return (
        <li key={i}>
          <Link {...props}>{text}</Link>
        </li>
      );
    });
  }

  // 页面渲染
  render() {
    const {expanded, isMin} = this.state;
    const showClass = expanded ? styles.show : styles.hidden;

    return (
      <div className={`${styles.menuBox} ${showClass}`}>
        <ul className={styles.navList}>
          {this.renderNavList()}
        </ul>
        <a className={styles.switch} onClick={this.onExpand}>
          <i className={styles.switchIcon}>&rsaquo;</i>
        </a>
        {isMin && expanded ? <div className={styles.cover} onClick={this.onExpand} /> : null}
      </div>
    );
  }
}

export default Menu;
