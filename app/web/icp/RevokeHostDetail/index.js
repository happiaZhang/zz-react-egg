import TrialDetail from '../TrialDetail/index';
import message from '../../components/Message/index';
import api from '../api';

class RevokeHostDetail extends TrialDetail {
  constructor(props) {
    super(props);
    this.name = 'RevokeHostDetail';
    this.route = [{key: 'revokeHost', to: '/revoke/host', text: '注销主体'}];
    this.anchor = [
      {text: '主体信息', to: 'host'},
      {text: '网站信息', to: 'website'},
      {text: '查看备案密码', to: 'password'}
    ];
  }

  // overwrite
  setMsg = () => {
    let msg = '提交管局审核已成功';
    if (this.name === 'RevokeAccessReject') msg = '取消接入已驳回';
    if (this.name === 'RevokeAccessResolve') msg = '取消接入已通过';
    return msg;
  };

  onCommit = () => {
    const data = {
      rejectReason: '',
      operId: this.getOperId(),
      filingStatus: 20002
    };

    if (this.name === 'RevokeSiteDetail') data.filingStatus = 30002;
    if (this.name === 'RevokeAccessReject') data.filingStatus = 40004;
    if (this.name === 'RevokeAccessResolve') data.filingStatus = 40003;

    api.setFilingStatus(data).then(() => {
      message.success(this.setMsg(), 2, () => {
        this.switch2List();
      });
    }).catch(error => {
      message.error(error);
    });
  };

  // overwrite
  genBtnGroup = () => {
    this.btnGroup = [{key: 'commit', text: '提交至管局审核', onClick: this.onCommit, style: {width: 150}}];
  };
}

export default RevokeHostDetail;
