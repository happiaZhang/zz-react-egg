import styles from './index.scss';
import React from 'react';
import {connect} from 'react-redux';
import Button from '../Button';

class ButtonGroup extends React.Component {
  static defaultProps = {
    btns: [],
    isLoading: false
  };

  constructor(props) {
    super(props);
    this.state = {
      btns: props.btns,
      isLoading: props.isLoading
    };
  }

  componentWillReceiveProps(nextProps) {
    const {btns, loading} = nextProps;
    if (btns !== this.props.btns) {
      this.setState({btns});
    }

    const isLoading = loading.length > 0;
    if (isLoading !== this.state.isLoading) {
      this.setState({isLoading});
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const stateKey = Object.keys(nextState).find(k => nextState[k] !== this.state[k]);
    return stateKey != null;
  }

  render() {
    const {style} = this.props;
    const {btns, isLoading} = this.state;
    if (btns.length === 0) return null;

    btns.forEach(btn => {
      btn.loading = isLoading;
    });

    return (
      <div className={styles.btnGroup} style={style}>
        {btns.map(props => <Button {...props} />)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.loader.loading,
    loaded: state.loader.loaded
  };
}

export default connect(mapStateToProps)(ButtonGroup);
