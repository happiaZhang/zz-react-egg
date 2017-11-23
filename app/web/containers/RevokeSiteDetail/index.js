import RevokeHostDetail from '../RevokeHostDetail';

class RevokeSiteDetail extends RevokeHostDetail {
  constructor(props) {
    super(props);
    this.name = 'RevokeSiteDetail';
    this.route = [{key: 'revokeSite', to: '/revoke/site', text: '注销网站'}];
  }
}

export default RevokeSiteDetail;
