import BaseContainer from '../BaseContainer';
import message from '../../components/Message';
import apis from '../../utils/apis';
import {FILING_STATUS} from '../../utils/constants';

class RevokeHost extends BaseContainer {
  constructor(props) {
    super(props);
    this.title = '注销主体';
    this.selectAll = [20001, 20002];
    this.selectOptions = this.genOptions();
    this.loadFunc = apis.getHostRevokeInfo;
    this.revokeFunc = apis.setHostRevoke;
    this.implOperation = this.handleRevoke;
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

  // 设置表头内容(overwrite)
  setTheadData = () => {
    return [
      {text: '主办单位', value: 'hostname'},
      {text: '备案号', value: 'icpFilingNoHost'},
      {
        text: '关联域名',
        value: 'website',
        render: this.handleMultipleLine()
      },
      {text: '最近更新时间', value: 'updateTime'},
      {
        text: '状态',
        value: 'status',
        render: (value, item) => {
          const revoked = item[value];
          const {text} = FILING_STATUS.find(({value}) => (value === revoked));
          return text;
        }
      },
      {text: '操作', value: 'OPERATION_COLUMN', width: 60}
    ];
  };
}

export default RevokeHost;
