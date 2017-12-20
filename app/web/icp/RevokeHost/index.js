import BaseContainer from '../BaseContainer';
import apis from '../../utils/apis';
import {FILING_STATUS} from '../../utils/constants';
import datetime from '../../components/Datepicker/datetime';

class RevokeHost extends BaseContainer {
  constructor(props) {
    super(props);
    this.title = '注销主体';
    this.selectAll = [20001, 20002];
    this.selectOptions = this.genOptions();
    this.loadFunc = apis.getHostRevokeInfo;
  }

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
      {text: '最近更新时间', value: 'updateTime', render: (value, item) => (datetime.utc(item[value]))},
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
