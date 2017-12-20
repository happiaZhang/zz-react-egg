import React from 'react';
import {connect} from 'react-redux';
import ModalDelivery from '../ModalDelivery/index';
import ModalAlert from '../ModalAlert';
import * as types from '../../utils/constants';

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
    const {name, ...other} = this.props.data;
    other.onClose = this.onClose;
    if (name === 'ModalDelivery') return <ModalDelivery {...other} />;
    if (name === 'ModalAlert') return <ModalAlert {...other} />;
  }
}

function mapStateToProps(state) {
  return state.modal;
}

export default connect(mapStateToProps)(ModalContainer);
