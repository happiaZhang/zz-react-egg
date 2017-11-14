import HostRevoke from '../HostRevoke';
import apis from '../../utils/apis';

class AccessRevoke extends HostRevoke {
  constructor(props) {
    super(props);
    this.title = '取消接入';
    this.apiFunc = apis.getAccessRevokeInfo;
  }
}

export default AccessRevoke;
