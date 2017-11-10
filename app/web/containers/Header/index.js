import styles from './index.scss';
import React from 'react';
import message from '../../components/Message';
import apis from '../../utils/apis';
import logoImage from './logo.png';

export default class Header extends React.Component {
  // 构造方法
  constructor(props) {
    super(props);

    this.state = {
      adminName: ''
    };
  }

  // 组件加载完成以后
  componentDidMount() {
    // 获取管理员信息
    // this.getAdminInfo();
  }

  // 获取管理员信息
  getAdminInfo() {
    apis.getAdminInfo().then((data) => {
      this.setState({
        adminName: data.name
      });
    }).catch(() => {
      message.error('获取用户信息失败，请刷新重试');
    });
  }

  // 页面渲染
  render() {
    const {adminName} = this.state;

    return (
      <div className={styles.headerBox}>
        <div className={styles.logo}><img src={logoImage} /></div>
        <div className={styles.user}>欢迎您，{adminName} <a href='https://admin.cloud.wanda.cn/logout'>退出</a></div>
      </div>
    );
  }
}
