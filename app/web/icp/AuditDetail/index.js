import TrialDetail from '../TrialDetail/index';

class AuditDetail extends TrialDetail {
  constructor(props) {
    super(props);
    this.name = 'AuditDetail';
    this.route = [{key: 'audit', to: '/audit', text: '管局审核'}];
  }
}

export default AuditDetail;
