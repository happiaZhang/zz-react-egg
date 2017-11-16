import styles from './index.scss';
import React from 'react';
import MainHeader from '../MainHeader';
import Select from '../../components/Select';
import Search from '../../components/Search';
import Pagination from '../../components/Pagination';
import Table from '../../components/Table';
import message from '../../components/Message';
import apis from '../../utils/apis';
import validate from '../../utils/validate';

const FILING_TYPE = {
  1: '首次备案',
  2: '新增网站',
  3: '新增接入',
  4: '备案变更',
  5: '注销主体',
  6: '注销网站',
  7: '取消网站接入'
};
class BaseContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filingType: '',
      status: '',
      operId: '',
      pageSize: 10,
      pageNumber: 1,
      totalSize: 0,
      showModal: false,
      elements: []
    };
  }

  // 组件即将挂载
  componentWillMount() {
    this.selectAll = this.setSelectAll();
  }

  // 设置下拉框为全部时status的值
  setSelectAll = () => {
    const all = [];
    this.selectOptions.forEach(({value}) => {
      if (!validate.isEmpty(value)) all.push(value);
    });
    return all;
  }

  // 组件初次挂载
  componentDidMount() {
    this.loadTableData();
  }

  // 组件即将卸载
  componentWillUnmount() {
    this.searchTimer && clearTimeout(this.searchTimer);
  }

  // 加载表格数据
  loadTableData = (newState) => {
    const {pageSize, pageNumber, status, operId} = this.state;
    const params = {
      queryType: 1,
      filingType: '',
      hostname: '',
      website: '',
      startTime: '',
      endTime: '',
      operId,
      status,
      pageSize,
      pageNumber,
      ...newState
    };

    // 获取表格数据
    apis.getTableData(this.convertParams(params)).then(res => {
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

  // 格式化请求参数
  convertParams = (params) => {
    if (validate.isEmpty(params.status)) return {...params, status: this.selectAll};
    return params;
  };

  // 设置表头内容
  setTheadData = () => {
    return [
      {text: '备案主体', value: 'hostname'},
      {
        text: '关联域名',
        value: 'website',
        render: this.handleMultipleLine()
      },
      {text: '备案类型', value: 'filingType', render: (value, item) => (FILING_TYPE[item[value]] || '')},
      {text: '最近更新时间', value: 'updateTime'},
      {
        text: '状态',
        value: 'status',
        render: (value, item) => {
          const status = this.selectOptions.find(s => s.value === item[value]);
          return status.text;
        }
      },
      {text: '操作', value: 'OPERATION_COLUMN', width: 60}
    ];
  };

  // 处理多行显示问题
  handleMultipleLine = (delimiter = '\n') => {
    return (value, item) => {
      const innerText = item[value];
      if (validate.isNil(innerText)) return '';
      const list = [];
      const textArray = innerText.split(delimiter);
      textArray.forEach((text, i) => {
        list.push(<li key={i}>{text}</li>);
      });
      return <ul>{list}</ul>;
    };
  };

  // 设置表格内容
  setTbodyData = () => {
    const {elements} = this.state;
    if (elements.length === 0) return elements;
    return elements.map(elm => {
      elm.operations = typeof this.operations === 'function' ? this.operations(elm) : this.operations;
      return elm;
    });
  };

  // 改变下拉框状态
  changeStatus = (status) => {
    this.loadTableData({status});
  };

  // 条件搜索
  onSearch = (operId) => {
    this.setState({operId});
    this.searchTimer && clearTimeout(this.searchTimer);
    this.searchTimer = setTimeout(() => {
      this.loadTableData({operId});
    }, 300);
  };

  //  改变每页显示数量
  changePageSize = (pageSize) => {
    this.loadTableData({pageSize});
  };

  //  改变页码
  changePageNumber = (pageNumber) => {
    this.setState({pageNumber});
    this._timer && clearTimeout(this._timer);
    this._timer = setTimeout(() => {
      const isValid = this.validPageNumber(pageNumber);
      isValid && this.loadTableData({pageNumber});
    }, 300);
  };

  // 检验页码合理性
  validPageNumber = (PageNumber) => {
    const {pageSize, totalSize} = this.state;
    const pageNumberMax = Math.ceil(totalSize / pageSize);
    return PageNumber >= 1 && PageNumber <= pageNumberMax;
  };

  // 每行操作处理
  onRowOperation = (type, data) => {
    const {history} = this.props;
    const {operId, siteId} = data;
    switch (type) {
      case 'TRIAL_QUERY':
        history.push(`/trial/detail/${operId}`);
        break;
      case 'DELIVERY':
        this.loadCurtain(operId);
        break;
      case 'VERIFY_QUERY':
        history.push(`/verify/detail/${operId}`);
        break;
      case 'AUDIT_RESOLVE':
        history.push(`/audit/resolve/${operId}`);
        break;
      case 'AUDIT_REJECT':
        history.push(`/audit/reject/${operId}`);
        break;
      case 'AUDIT_QUERY':
        history.push(`/audit/detail/${operId}`);
        break;
      case 'REVOKE_HOST_QUERY':
        history.push(`/revoke/host/${operId}`);
        break;
      case 'REVOKE_SITE_QUERY':
        history.push(`/revoke/site/${operId}/${siteId}`);
        break;
      case 'REVOKE_ACCESS_QUERY':
        history.push(`/audit/access/${operId}/${siteId}`);
        break;
    }
  };

  // 关闭模态框
  onClose = (reload = false) => {
    this.setState({showModal: false}, () => {
      if (reload) {
        const {history} = this.props;
        history.push('/delivery');
      }
    });
  };

  // 改变备案类型
  changeFilingType = (filingType) => {
    this.setSelectOptions(filingType);
    this.setState({filingType, status: ''});
  }

  // 渲染过滤器
  renderFilter = () => {
    const {status, operId} = this.state;
    return this.isQuery ? this.genFilter(this.state) : (
      <div className={styles.tableOperation}>
        <div className={styles.left}>
          <Select
            style={{width: 140}}
            data={this.selectOptions}
            value={status}
            onChangeValue={this.changeStatus} />
        </div>
        <Search
          placeholder='请输入申请ID'
          value={operId}
          onChangeValue={this.onSearch} />
      </div>
    );
  };

  // 页面渲染
  render() {
    const {pageSize, pageNumber, totalSize, showModal} = this.state;

    return (
      <div>
        <MainHeader title={this.title} />
        {this.renderFilter()}
        <Pagination
          type='simple'
          style={{marginTop: 12}}
          pageSize={pageSize}
          pageNumber={pageNumber}
          totalSize={totalSize}
          onPageSizeSwitch={this.changePageSize}
          onPageNumberSwitch={this.changePageNumber} />
        <Table
          theadData={this.setTheadData()}
          tbodyData={this.setTbodyData()}
          pageSize={pageSize}
          pageNumber={pageNumber}
          totalSize={totalSize}
          onItemOperationClick={this.onRowOperation} />
        <Pagination
          pageSize={pageSize}
          pageNumber={pageNumber}
          totalSize={totalSize}
          onPageNumberSwitch={this.changePageNumber} />
        {showModal ? this.renderModal() : ''}
      </div>
    );
  }
}

export default BaseContainer;
