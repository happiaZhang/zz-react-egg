import RevokeHost from '../RevokeHost';
import apis from '../../utils/apis';

class RevokeSite extends RevokeHost {
  constructor(props) {
    super(props);
    this.title = '注销网站';
    this.apiFunc = apis.getSiteRevokeInfo;
  }
}

export default RevokeSite;
