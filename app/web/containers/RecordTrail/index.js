import BaseContainer, {setSelectAll} from '../BaseContainer';

const TRAIL_STATUS = [
  {value: '', text: '全部'},
  {value: 10040, text: '待初审'},
  {value: 10060, text: '已驳回'}
];

class RecordTrail extends BaseContainer {
  // 构造方法
  constructor(props) {
    super(props);
    this.title = '备案初审';
    this.selectOptions = TRAIL_STATUS;
    this.selectAll = setSelectAll(TRAIL_STATUS);
    this.errorMsg = '获取初审列表失败，请刷新重试';
    this.operations = [{type: 'TRAIL', text: '查看'}];
  }
}

export default RecordTrail;
