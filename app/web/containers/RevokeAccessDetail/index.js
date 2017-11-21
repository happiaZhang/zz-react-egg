import RevokeHostDetail from '../RevokeHostDetail';
import apis from '../../utils/apis';

class RevokeAccessDetail extends RevokeHostDetail {
  constructor(props) {
    super(props);
    this.name = 'RevokeAccessDetail';
    this.route = [{key: 'revokeAccess', to: '/revoke/access', text: '取消接入'}];
    this.apiFunc = apis.setAccessRevoke;
  }
}

export default RevokeAccessDetail;
