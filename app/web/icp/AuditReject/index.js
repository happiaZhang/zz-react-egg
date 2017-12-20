import TrialDetail from '../TrialDetail/index';

class AuditReject extends TrialDetail {
  constructor(props) {
    super(props);
    this.name = 'AuditReject';
    this.state.checkMode = true;
    this.route = [{key: 'audit', to: '/audit', text: '管局审核'}];
  }

  // 取消处理 (overwrite)
  onCheckMode = () => {
    return () => {
      this.switch2List();
    };
  };

  // 设置备案状态 (overwrite)
  setFilingStatus = (isResolve) => (isResolve ? 10100 : 10110);

  // 设置消息提醒 (overwrite)
  setMsg = (isResolve) => (`管局已${isResolve ? '通过' : '驳回'}`);
}

export default AuditReject;
