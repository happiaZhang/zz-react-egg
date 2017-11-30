import styles from './index.scss';
import React from 'react';
import {connect} from 'react-redux';
import message from '../../components/Message';
import validate from '../../utils/validate';
import apis from '../../utils/apis';

let DEFAULT_CONTENT = null;
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
    if (showLoading) DEFAULT_CONTENT = this.setMsgContent(loading[0].substring(0, 3));
    if (showLoading !== this.state.showLoading) {
      this.state.showLoading = showLoading;
      this.showMessage();
    }
  }

  setMsgContent = (type) => {
    let action = '加载';
    switch (type) {
      case 'set':
        action = '处理';
        break;
      case 'exp':
        action = '导出';
        break;
    }
    return (
      <span>数据正在{action}中，请耐心等待<i className={styles.loading}>...</i></span>
    );
  };

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

  componentDidMount() {
    const isDev = validate.isDev();
    if (!isDev) {
      // 获取管理员信息
      apis.getAdminInfo().then(res => {
        const {data} = res;
        validate.setUserInfo(data);
      }).catch(error => {
        message.error(error);
      });
    }
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
