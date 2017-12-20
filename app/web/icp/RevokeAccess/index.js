import RevokeHost from '../RevokeHost/index';
import apis from '../../utils/apis';

class RevokeAccess extends RevokeHost {
  constructor(props) {
    super(props);
    this.title = '取消接入';
    this.selectAll = [40001, 40002];
    this.selectOptions = this.genOptions();
    this.loadFunc = apis.getSiteAccesscancelledInfo;
  }
}

export default RevokeAccess;