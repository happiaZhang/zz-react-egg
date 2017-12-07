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
import {FILING_STATUS, FILING_TYPE, genOperations, handleOperations} from '../../utils/constants';
import datetime from '../../components/Datepicker/datetime';

class BaseContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queryType: '',
      filingType: '',
      status: '',
      operId: '',
      pageSize: 10,
      pageNumber: 1,
      totalSize: 0,
      elements: [],
      hostname: '',
      website: '',
      startTime: '',
      endTime: ''
    };
    this.loadFunc = apis.getInfoSummaryNonRevoked;
  }

  // 组件初次挂载
  componentDidMount() {
    this.loadTableData();
  }

  // 组件即将卸载
  componentWillUnmount() {
    this.searchTimer && clearTimeout(this.searchTimer);
  }

  // 格式化请求参数
  convertParams = (params) => {
    const data = {...params};
    delete data.startTime;
    delete data.endTime;
    if (validate.isEmpty(data.status)) data.status = this.selectAll;
    return data;
  };

  // 设置下拉框列表
  genOptions = () => {
    const options = [{value: '', text: '全部'}];
    this.selectAll.forEach(value => {
      const {text} = FILING_STATUS.find(s => (s.value === value));
      options.push({value, text});
    });
    return options;
  };

  // 加载表格数据
  loadTableData = (newState) => {
    const {
      queryType,
      filingType,
      pageSize,
      pageNumber,
      status,
      operId,
      startTime,
      endTime,
      hostname,
      website
    } = this.state;
    const params = {
      queryType,
      filingType,
      hostname,
      website,
      startTime,
      endTime,
      operId,
      status,
      pageSize,
      pageNumber,
      ...newState
    };

    // 获取表格数据
    this.loadFunc(this.convertParams(params)).then(res => {
      const {elements, totalSize} = res;
      this.setState({
        totalSize,
        elements,
        pageSize: params.pageSize,
        pageNumber: params.pageNumber,
        status: params.status,
        website: params.website
      });
    }).catch(error => {
      message.error(error);
    });
  };

  // 设置表头内容
  setTheadData = () => {
    return [
      {text: '主办单位', value: 'hostname'},
      {
        text: '关联域名',
        value: 'website',
        render: this.handleMultipleLine()
      },
      {text: '备案类型', value: 'filingType', render: (value, item) => (FILING_TYPE[item[value]] || '')},
      {text: '最近更新时间', value: 'updateTime', render: (value, item) => (datetime.utc(item[value]))},
      {
        text: '状态',
        value: 'status',
        render: (value, item) => {
          const status = FILING_STATUS.find(s => s.value === item[value]);
          return status ? status.text : item[value];
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
      elm.operations = genOperations(elm);
      return elm;
    });
  };

  // 改变下拉框状态
  changeStatus = (status) => {
    this.loadTableData({status});
  };

  // 条件搜索
  onSearch = (website) => {
    this.setState({website});
    this.searchTimer && clearTimeout(this.searchTimer);
    this.searchTimer = setTimeout(() => {
      this.loadTableData({website});
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
    if (type === 'DELIVERY') {
      apis.genModal({
        show: true,
        data: {
          ...data,
          name: 'ModalDelivery',
          callback: this.loadTableData.bind(this)
        }
      });
    } else if (type === 'REVOKE_DONE') {
      this.handleRevoke(data, true);
    } else if (type === 'REVOKE_FAIL') {
      this.handleRevoke(data, false);
    } else {
      handleOperations(type, data, history);
    }
  };

  // 处理注销状态
  handleRevoke = (row, isDone) => {
    const {status, operId} = row;
    const data = {
      rejectReason: '',
      operId: parseInt(operId),
      filingStatus: isDone ? 20003 : 20004
    };
    if (status === 30002) data.filingStatus = isDone ? 30003 : 30004;

    const msgSuccess = `${this.title}${isDone ? '已通过' : '已驳回'}`;

    apis.setFilingStatus(data).then(() => {
      message.success(msgSuccess, 2, () => {
        this.loadTableData();
      });
    }).catch(error => {
      message.error(error);
    });
  };

  // 渲染过滤器
  renderFilter = () => {
    const {status, website} = this.state;
    return this.setFilter ? this.genFilter() : (
      <div className={styles.tableOperation}>
        <div className={styles.left}>
          <Select
            style={{width: 140}}
            data={this.selectOptions}
            value={status}
            onChangeValue={this.changeStatus} />
        </div>
        <Search
          placeholder='请输入关联域名'
          value={website}
          onChangeValue={this.onSearch} />
      </div>
    );
  };

  // 页面渲染
  render() {
    const {pageSize, pageNumber, totalSize} = this.state;

    return (
      <div style={{minWidth: 520}}>
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
      </div>
    );
  }
}

export default BaseContainer;
