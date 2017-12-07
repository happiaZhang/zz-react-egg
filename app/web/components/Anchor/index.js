import styles from './index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  initAnchor,
  activeTarget,
  fixAnchor,
  removeScroll,
  addScroll,
  showHanging,
  hideHanging
} from '../../utils/scroller';

class Anchor extends React.Component {
  static defaultProps = {
    items: [],
    hanging: false,
    show: false,
    activeKey: 'host'
  };

  constructor(props) {
    super(props);
    this.state = {
      activeKey: props.activeKey,
      show: props.show
    };
  }

  componentWillReceiveProps(nextProps) {
    const {activeKey, show} = nextProps;
    if (show !== this.props.show) {
      this.setState({show});
    }
    if (activeKey !== this.props.activeKey) {
      this.setState({activeKey});
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const stateKey = Object.keys(nextState).find(k => nextState[k] !== this.state[k]);
    return stateKey != null;
  }

  componentDidMount() {
    const {hanging} = this.props;
    if (!hanging) this.handleScrolling();
  }

  handleScrolling = () => {
    const {items} = this.props;
    const targetElms = [];
    items.forEach(item => {
      targetElms.push(document.getElementById(item.to));
    });
    const anchorElm = ReactDOM.findDOMNode(this);

    initAnchor(targetElms, anchorElm, {
      getActiveKey: this.getActiveKey.bind(this),
      getFixInfo: this.getFixInfo.bind(this)
    });

    addScroll();
  };

  componentWillUnmount() {
    removeScroll();
    hideHanging();
  }

  getActiveKey = () => {
    const {activeKey} = this.state;
    const activeElm = activeTarget();
    if (activeKey !== activeElm.id) this.setState({activeKey: activeElm.id});
  };

  getFixInfo = () => {
    const {isFixed, anchorStyle} = fixAnchor();
    const {items} = this.props;
    const {activeKey} = this.state;
    const props = {
      items,
      activeKey,
      hanging: true,
      style: anchorStyle
    };

    isFixed ? showHanging(props) : hideHanging(props);
  };

  render() {
    const {items, style, hanging} = this.props;
    const {activeKey, show} = this.state;
    if (items.length === 0 || (hanging && !show)) return null;

    let classNames = styles.anchorContainer;
    if (hanging && show) classNames += ' ' + styles.show;
    return (
      <div className={classNames} style={style}>
        {
          items.map(item => {
            const {to, text} = item;
            const props = {
              key: to,
              href: '#' + to
            };
            if (activeKey === to) props.className = styles.active;
            return <a {...props}>{text}</a>;
          })
        }
      </div>
    );
  }
}

export default Anchor;
