import BaseContainer from '../BaseContainer';
import message from '../../components/Message';
import apis from '../../utils/apis';

const REVOKE_STATUS = [
  {value: '', text: '全部'},
  {value: 1, text: '待处理'},
  {value: 2, text: '待管局审核'},
  {value: 3, text: '已完成'}
];

const REVOKE_STATUS_TEMP = {
  20000: '未提交',
  20001: '待处理',
  20002: '待管局审核',
  20003: '已处理',
  20004: '已处理',
  30000: '未提交',
  30001: '待处理',
  30002: '待管局审核',
  30003: '已处理',
  30004: '已处理',
  40000: '未提交',
  40001: '待处理',
  40002: '待管局审核',
  40003: '已处理',
  40004: '已处理'
};

class HostRevoke extends BaseContainer {
  constructor(props) {
    super(props);
    this.title = '注销主体';
    this.selectOptions = REVOKE_STATUS;
    this.errorMsg = `获取${this.title}信息失败，请刷新重试`;
    this.apiFunc = apis.getHostRevokeInfo;
    this.operations = this.setOperations;
  }

  // 加载表格数据(overwrite)
  loadTableData = (newState) => {
    const {pageSize, pageNumber, operId} = this.state;
    const params = {
      operId,
      pageSize,
      pageNumber,
      ...newState,
      status: ''
    };

    // 获取表格数据
    this.apiFunc(params).then(res => {
      const {elements, totalSize} = res;
      this.setState({
        totalSize,
        elements,
        pageSize: params.pageSize,
        pageNumber: params.pageNumber,
        status: params.status,
        operId: params.operId
      });
    }).catch(() => {
      message.error(this.errorMsg);
    });
  };

  // 设置表头内容(overwrite)
  setTheadData = () => {
    return [
      {text: '申请ID', value: 'operId'},
      {text: '备案主体', value: 'hostname'},
      {text: '备案号', value: 'filingServiceNo'},
      {
        text: '网站名称',
        value: 'websiteName',
        render: this.handleMultipleLine()
      },
      {
        text: '关联域名',
        value: 'websiteUrl',
        render: this.handleMultipleLine()
      },
      {text: '最近更新时间', value: 'updateTime'},
      {
        text: '状态',
        value: 'revoked',
        render: (value, item) => (REVOKE_STATUS_TEMP[item[value]])
      },
      {text: '操作', value: 'OPERATION_COLUMN', width: 60}
    ];
  };

  setOperations = (elm) => {
    const {revoked} = elm;
    if (revoked === 1) {
      return [{type: 'REVOKE_HOST', text: '查看'}];
    } else if (revoked === 2) {
      return [{type: 'REVOKE_CONFIRM', text: '已完成'}];
    }
  };
}

export default HostRevoke;
