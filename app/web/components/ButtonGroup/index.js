import styles from './index.scss';
import React from 'react';
import Button from '../Button';

class ButtonGroup extends React.Component {
  static defaultProps = {
    btns: [],
    loading: false
  };

  constructor(props) {
    super(props);
    this.state = {
      btns: props.btns,
      loading: props.loading
    };
  }

  componentWillReceiveProps(nextProps) {
    const {btns, loading} = nextProps;
    if (btns !== this.props.btns) {
      this.setState({btns});
    }
    if (loading !== this.props.loading) {
      this.setState({loading});
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const stateKey = Object.keys(nextState).find(k => nextState[k] !== this.state[k]);
    return stateKey != null;
  }

  render() {
    const {style} = this.props;
    const {btns, loading} = this.state;
    if (btns.length === 0) return null;

    btns.forEach(btn => {
      btn.loading = loading;
    });

    return (
      <div className={styles.btnGroup} style={style}>
        {btns.map(props => <Button {...props} />)}
      </div>
    );
  }
}

export default ButtonGroup;
