import React from 'react';
import {connect} from 'react-redux';
import * as types from '../../models/constants';

class ModalContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: props.show
    };
  }

  componentWillReceiveProps(nextProps) {
    const {show} = nextProps;
    if (show !== this.props.show) {
      this.setState({show});
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {show} = nextState;
    return show !== this.state.show;
  }

  onClose = () => {
    const {dispatch} = this.props;
    dispatch({type: types.MODAL, payload: {show: false}});
  };

  render() {
    const {show} = this.state;
    if (!show) return null;
    const {component, ...other} = this.props.data;
    other.onClose = this.onClose;
    return React.createElement(component, other);
  }
}

function mapStateToProps(state) {
  return state.modal;
}

export default connect(mapStateToProps)(ModalContainer);
