import RevokeHost from '../RevokeHost';
import apis from '../../utils/apis';

class RevokeAccess extends RevokeHost {
  constructor(props) {
    super(props);
    this.title = '取消接入';
    this.apiFunc = apis.getAccessRevokeInfo;
  }
}

export default RevokeAccess;
