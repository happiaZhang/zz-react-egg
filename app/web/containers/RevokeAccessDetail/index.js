import RevokeHostDetail from '../RevokeHostDetail';
import apis from '../../utils/apis';

class RevokeAccessDetail extends RevokeHostDetail {
  constructor(props) {
    super(props);
    this.route = [{key: 'revokeAccess', to: '/revoke/access', text: '取消接入'}];
    this.type = 'RevokeAccessDetail';
    this.apiFunc = apis.setAccessRevoke;
  }
}

export default RevokeAccessDetail;
