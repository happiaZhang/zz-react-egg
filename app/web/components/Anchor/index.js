import styles from './index.scss';
import React from 'react';

class Anchor extends React.Component {
  static defaultProps = {
    items: [],
    activeKey: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      activeKey: props.activeKey
    };
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const {items, style} = this.props;
    if (items.length === 0) return '';

    const {activeKey} = this.state;
    return (
      <div className={styles.anchorContainer} style={style}>
        {
          items.map(item => {
            const {to, text} = item;
            const props = {
              key: to,
              href: to
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
