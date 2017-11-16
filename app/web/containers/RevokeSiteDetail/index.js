import TrialDetail from '../TrialDetail';

class RevokeSiteDetail extends TrialDetail {
  constructor(props) {
    super(props);
    this.route = [{key: 'revokeSite', to: '/revoke/site', text: '注销网站'}];
    this.anchor = [
      {text: '主体信息', to: '#host'},
      {text: '网站信息', to: '#website'},
      {text: '查看备案密码', to: '#password'}
    ];
    this.type = 'RevokeSiteDetail';
  }
}

export default RevokeSiteDetail;
