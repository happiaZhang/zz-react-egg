import styles from './index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  initAnchor,
  activeTarget,
  fixAnchor,
  removeScroll,
  getEvtStatus,
  addScroll,
  showHanging,
  hideHanging
} from '../../utils/scroller';

let nodeContainer = null;

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

    const noEvt = getEvtStatus();
    if (noEvt) addScroll();
  };

  componentWillUnmount() {
    removeScroll();
  }

  getActiveKey = () => {
    const {activeKey} = this.state;
    const activeElm = activeTarget();
    if (activeKey !== activeElm.id) this.setState({activeKey: activeElm.id});
  };

  getFixInfo = () => {
    const {isFixed, top, left, width, anchorLeft} = fixAnchor();
    if (!nodeContainer) {
      nodeContainer = document.createElement('div');
      nodeContainer.style.position = 'fixed';
      nodeContainer.style.top = top + 'px';
      nodeContainer.style.left = left + 'px';
      nodeContainer.style.backgroundColor = '#f5f7fa';
      nodeContainer.style.zIndex = 1000;
      document.body.appendChild(nodeContainer);
    }
    nodeContainer.style.width = width + 'px';

    const {items} = this.props;
    const {activeKey} = this.state;
    const props = {
      items,
      activeKey,
      hanging: true,
      node: nodeContainer,
      style: {
        paddingTop: 20,
        marginLeft: anchorLeft - left
      }
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
