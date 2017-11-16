import BaseContainer from '../BaseContainer';
import message from '../../components/Message';
import apis from '../../utils/apis';

const REVOKE_HOST_STATUS = [
  {value: '', text: '全部'},
  {value: 20001, text: '待处理'},
  {value: 20002, text: '待管局审核'}
];

const REVOKE_STATUS = {
  20001: '待处理',
  20002: '待管局审核',
  30001: '待处理',
  30002: '待管局审核',
  40001: '待处理',
  40002: '待管局审核'
};

const REVOKE_TYPE = {
  20001: 'REVOKE_HOST_QUERY',
  20002: 'REVOKE_DONE',
  30001: 'REVOKE_SITE_QUERY',
  30002: 'REVOKE_DONE',
  40001: 'REVOKE_ACCESS_QUERY',
  40002: 'REVOKE_DONE'
};

class RevokeHost extends BaseContainer {
  constructor(props) {
    super(props);
    this.title = '注销主体';
    this.selectOptions = REVOKE_HOST_STATUS;
    this.errorMsg = `获取${this.title}信息失败，请刷新重试`;
    this.apiFunc = apis.getHostRevokeInfo;
    this.operations = this.setOperations;
  }

  // 加载表格数据(overwrite)
  loadTableData = (newState) => {
    const {pageSize, pageNumber, operId, status} = this.state;
    const params = {
      operId,
      status,
      pageSize,
      pageNumber,
      ...newState
    };

    // 获取表格数据
    this.apiFunc(this.convertParams(params)).then(res => {
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
        render: (value, item) => (REVOKE_STATUS[item[value]])
      },
      {text: '操作', value: 'OPERATION_COLUMN', width: 60}
    ];
  };

  setOperations = (elm) => {
    const {revoked} = elm;
    if (revoked === 20001 || revoked === 30001 || revoked === 40001) {
      return [{type: REVOKE_TYPE[revoked], text: '查看'}];
    } else if (revoked === 20002 || revoked === 30002 || revoked === 40002) {
      return [{type: REVOKE_TYPE[revoked], text: '已完成'}];
    }
  };
}

export default RevokeHost;
