import RevokeHost from '../RevokeHost';
import apis from '../../utils/apis';

class RevokeAccess extends RevokeHost {
  constructor(props) {
    super(props);
    this.title = '取消接入';
    this.selectAll = [40001, 40002];
    this.selectOptions = this.genOptions();
    this.loadFunc = apis.getAccessRevokeInfo;
    this.revokeFunc = apis.setAccessRevoke;
  }
}

export default RevokeAccess;
