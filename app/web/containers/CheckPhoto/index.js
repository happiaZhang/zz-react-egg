import BaseContainer from '../BaseContainer';

const CHECK_STATUS = [
  {value: '', text: '全部'},
  {value: 10070, text: '待审核幕布'},
  {value: 10080, text: '幕布照片被驳回'}
];

class CheckPhoto extends BaseContainer {
  constructor(props) {
    super(props);
    this.title = '审核幕布照片';
    this.selectOptions = CHECK_STATUS;
    this.errorMsg = '获取审核幕布照片列表失败，请刷新重试';
    this.operations = [{type: 'CHECK', text: '查看'}];
  }
}

export default CheckPhoto;
