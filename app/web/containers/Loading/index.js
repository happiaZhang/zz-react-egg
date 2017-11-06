import React from 'react';
import {connect} from 'react-redux';
import message from '../../components/Message';
import apis from '../../utils/apis';

const DEFAULT_CONTENT = '数据正在加载中，请耐心等待';
const DEFAULT_DURATION = 0;

class Loader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoading: false
    };
    apis.getDispatch(props.dispatch);
  }

  componentWillReceiveProps(nextProps) {
    const {loading} = nextProps;
    const showLoading = loading.length > 0;
    if (showLoading !== this.state.showLoading) {
      this.state.showLoading = showLoading;
      this.showMessage();
    }
  }

  showMessage = () => {
    const {showLoading} = this.state;
    if (!this.loadingKey && showLoading) {
      this.loadingKey = message.info(DEFAULT_CONTENT, DEFAULT_DURATION);
    } else if (this.loadingKey && !showLoading) {
      message.close(this.loadingKey);
      this.loadingKey = null;
    }
  };

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return null;
  }
}

function mapStateToProps(state) {
  return {
    ...state.loader.loading,
    loaded: state.loader.loaded
  };
}

export default connect(mapStateToProps)(Loader);
