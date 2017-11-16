import RevokeHost from '../RevokeHost';
import apis from '../../utils/apis';

const REVOKE_SITE_STATUS = [
  {value: '', text: '全部'},
  {value: 30001, text: '待处理'},
  {value: 30002, text: '待管局审核'}
];

class RevokeSite extends RevokeHost {
  constructor(props) {
    super(props);
    this.title = '注销网站';
    this.selectOptions = REVOKE_SITE_STATUS;
    this.apiFunc = apis.getSiteRevokeInfo;
  }
}

export default RevokeSite;
