import RevokeHostDetail from '../RevokeHostDetail';
import apis from '../../utils/apis';

class RevokeSiteDetail extends RevokeHostDetail {
  constructor(props) {
    super(props);
    this.route = [{key: 'revokeSite', to: '/revoke/site', text: '注销网站'}];
    this.type = 'RevokeSiteDetail';
    this.apiFunc = apis.setSiteRevoke;
  }
}

export default RevokeSiteDetail;
