import RevokeHostDetail from '../RevokeHostDetail';
import apis from '../../utils/apis';

class RevokeSiteDetail extends RevokeHostDetail {
  constructor(props) {
    super(props);
    this.name = 'RevokeSiteDetail';
    this.route = [{key: 'revokeSite', to: '/revoke/site', text: '注销网站'}];
    this.apiFunc = apis.setSiteRevoke;
  }
}

export default RevokeSiteDetail;
