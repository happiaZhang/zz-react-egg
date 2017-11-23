import RevokeHost from '../RevokeHost';
import apis from '../../utils/apis';

class RevokeSite extends RevokeHost {
  constructor(props) {
    super(props);
    this.title = '注销网站';
    this.selectAll = [30001, 30002];
    this.selectOptions = this.genOptions();
    this.loadFunc = apis.getSiteRevokeInfo;
  }
}

export default RevokeSite;
