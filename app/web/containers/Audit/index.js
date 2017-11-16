import BaseContainer from '../BaseContainer';

const AUDIT_STATUS = [
  {value: '', text: '全部'},
  {value: 10090, text: '待管局审核'},
  {value: 10100, text: '备案完成'}
];

class Audit extends BaseContainer {
  constructor(props) {
    super(props);
    this.title = '管局审核';
    this.selectOptions = AUDIT_STATUS;
    this.errorMsg = '获取管局审核列表失败，请刷新重试';
    this.operations = this.setOperations;
  }

  setOperations = (elm) => {
    const {status} = elm;
    if (status === 10100) {
      return [{type: 'AUDIT_QUERY', text: '查看'}];
    } else {
      return [
        {type: 'AUDIT_RESOLVE', text: '通过，填写备案号'},
        {type: 'AUDIT_REJECT', text: '驳回'}
      ];
    }
  }
}

export default Audit;
