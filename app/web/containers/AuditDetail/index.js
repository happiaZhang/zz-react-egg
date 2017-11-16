import TrialDetail from '../TrialDetail';

class AuditDetail extends TrialDetail {
  constructor(props) {
    super(props);
    this.route = [{key: 'audit', to: '/audit', text: '审核列表'}];
    this.type = 'AuditDetail';
  }
}

export default AuditDetail;
