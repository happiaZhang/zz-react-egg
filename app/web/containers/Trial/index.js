import BaseContainer from '../BaseContainer';

const TRIAL_STATUS = [
  {value: '', text: '全部'},
  {value: 10040, text: '待初审'},
  {value: 10060, text: '已驳回'}
];

class Trial extends BaseContainer {
  // 构造方法
  constructor(props) {
    super(props);
    this.title = '备案初审';
    this.selectOptions = TRIAL_STATUS;
    this.errorMsg = '获取初审列表失败，请刷新重试';
    this.operations = [{type: 'TRIAL_QUERY', text: '查看'}];
  }
}

export default Trial;
