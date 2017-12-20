import TrialDetail from '../TrialDetail';

class ModifyDetail extends TrialDetail {
  constructor(props) {
    super(props);
    this.name = 'ModifyDetail';
    this.route = [{key: 'modify', to: '/modify', text: '变更备案'}];
  }
}

export default ModifyDetail;
