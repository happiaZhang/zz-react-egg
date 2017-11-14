import HostRevoke from '../HostRevoke';
import apis from '../../utils/apis';

class SiteRevoke extends HostRevoke {
  constructor(props) {
    super(props);
    this.title = '注销网站';
    this.apiFunc = apis.getSiteRevokeInfo;
  }
}

export default SiteRevoke;
