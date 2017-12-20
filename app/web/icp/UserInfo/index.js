import React from 'react';
import message from '../../components/Message';
import validate from '../../utils/validate';
import api from '../api';

class UserInfo extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  componentDidMount() {
    const isDev = validate.isDev();
    if (!isDev) {
      // 获取管理员信息
      api.getAdminInfo().then(res => {
        const {data} = res;
        api.setUserInfo(data);
      }).catch(error => {
        message.error(error);
      });
    }
  }

  render() {
    return null;
  }
}

export default UserInfo;
