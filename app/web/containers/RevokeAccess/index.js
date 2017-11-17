import RevokeHost from '../RevokeHost';
import apis from '../../utils/apis';

const REVOKE_ACCESS_STATUS = [
  {value: '', text: '全部'},
  {value: 40001, text: '待处理'},
  {value: 40002, text: '待管局审核'}
];

class RevokeAccess extends RevokeHost {
  constructor(props) {
    super(props);
    this.title = '取消接入';
    this.selectOptions = REVOKE_ACCESS_STATUS;
    this.apiFunc = apis.getAccessRevokeInfo;
    this.revokeFunc = apis.setAccessRevoke;
  }
}

export default RevokeAccess;
