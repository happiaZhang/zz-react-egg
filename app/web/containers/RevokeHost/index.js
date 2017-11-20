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

export const REVOKE_TYPE = {
  20001: 'REVOKE_HOST_QUERY',
  30001: 'REVOKE_SITE_QUERY',
  40001: 'REVOKE_ACCESS_QUERY'
};

class RevokeHost extends BaseContainer {
  constructor(props) {
    super(props);
    this.title = '注销主体';
    this.selectOptions = REVOKE_HOST_STATUS;
    this.errorMsg = `获取${this.title}信息失败，请刷新重试`;
    this.apiFunc = apis.getHostRevokeInfo;
    this.revokeFunc = apis.setHostRevoke;
    this.operations = this.setOperations;
    this.handleRevoke = this.handleRevoke;
  }

  // 处理注销状态
  handleRevoke = (row, isDone) => {
    const {revoked, operId, siteId} = row;
    const data = {
      checkPerson: 'zhangzheng',
      operId: parseInt(operId),
      status: isDone ? 20003 : 20004
    };
    if (revoked !== 20002) data.siteId = parseInt(siteId);
    if (revoked === 30002) data.status = isDone ? 30003 : 30004;
    if (revoked === 40002) data.status = isDone ? 40003 : 40004;

    this.revokeFunc(data).then(() => {
      message.success('处理成功', 1, () => {
        this.loadTableData();
      });
    }).catch(() => {
      message.error('处理失败，请刷新重试');
    });
  };

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
      {text: '主办单位', value: 'hostname'},
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
      return [
        {type: 'REVOKE_DONE', text: '通过'},
        {type: 'REVOKE_FAIL', text: '失败'}
      ];
    }
  };
}

export default RevokeHost;
