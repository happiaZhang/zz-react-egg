import TrialDetail from '../TrialDetail';

class AuditReject extends TrialDetail {
  constructor(props) {
    super(props);
    this.name = 'AuditReject';
    this.route = [{key: 'audit', to: '/audit', text: '审核列表'}];
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
  setMsg = (isResolve) => {
    const successMsg = `管局已${isResolve ? '通过' : '驳回'}`;
    const errorMsg = `管局${isResolve ? '通过' : '驳回'}失败，请刷新重试`;
    return {successMsg, errorMsg};
  };
}

export default AuditReject;
