import styles from './index.scss';
import React from 'react';
import validate from '../../utils/validate';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.items || [],
      isOpen: props.isOpen || false
    };
  }

  componentWillReceiveProps(nextProps) {
    const {items, isOpen} = nextProps;
    if (items !== this.props.items) {
      this.setState({items});
    }
    if (isOpen !== this.props.isOpen) {
      this.setState({isOpen});
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const stateKey = Object.keys(nextState).find(k => nextState[k] !== this.state[k]);
    return !validate.isNil(stateKey);
  }

  renderOptions = () => {
    const {items} = this.state;
    const options = [];
    items.forEach(item => {
      const {value, text} = item;
      return (<li key={value} className={styles.dropdownItem}>{text || value}</li>);
    });
    return <ul className={styles.dropdownContainer}>{options}</ul>;
  };

  render() {
    const {items, isOpen} = this.state;
    if (items.length === 0 || !isOpen) return null;
    return (
      <div className={styles.dropdownWrap}>
        {this.renderOptions()}
      </div>
    );
  }
}

export default Dropdown;
