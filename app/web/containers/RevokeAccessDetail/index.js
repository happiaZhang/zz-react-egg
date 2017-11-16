import TrialDetail from '../TrialDetail';

class RevokeAccessDetail extends TrialDetail {
  constructor(props) {
    super(props);
    this.route = [{key: 'revokeAccess', to: '/revoke/access', text: '取消接入'}];
    this.anchor = [
      {text: '主体信息', to: '#host'},
      {text: '网站信息', to: '#website'},
      {text: '查看备案密码', to: '#password'}
    ];
    this.type = 'RevokeAccessDetail';
  }
}

export default RevokeAccessDetail;
