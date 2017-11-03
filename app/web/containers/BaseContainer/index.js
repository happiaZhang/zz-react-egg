import styles from '../RecordTrail/index.scss';
import React from 'react';
import MainHeader from '../MainHeader';
import Select from '../../components/Select';
import Search from '../../components/Search';
import Pagination from '../../components/Pagination';
import Table from '../../components/Table';
import message from '../../components/Message';
import apis from '../../utils/apis';
import validate from '../../utils/validate';

class BaseContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: '',
      searchText: '',
      pageSize: 10,
      pageNumber: 1,
      totalSize: 0,
      showModal: false,
      modalId: '',
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
    const {pageSize, pageNumber, status} = this.state;
    const params = {
      filingType: '',
      hostname: '',
      website: '',
      startTime: '',
      endTime: '',
      operId: '',
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
        searchText: params.operId
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
      {text: '申请ID', value: 'operId'},
      {text: '备案服务号', value: 'filingServiceNo'},
      {text: '关联域名', value: 'website'},
      {text: '备案类型', value: 'recordType', render: () => ('首次备案')},
      {text: '备案主体', value: 'hostname'},
      {text: '最近更新时间', value: 'updateTime'},
      {
        text: '状态',
        value: 'operStatus',
        render: (value, item) => {
          const status = this.selectOptions.find(s => s.value === item[value]);
          return status.text;
        }
      },
      {text: '操作', value: 'OPERATION_COLUMN', width: 60}
    ];
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
    this.setState({searchText: operId});
    this.searchTimer && clearTimeout(this.searchTimer);
    this.searchTimer = setTimeout(() => {
      this.loadTableData({operId});
    }, 500);
  };

  //  改变每页显示数量
  changePageSize = (pageSize) => {
    this.loadTableData({pageSize});
  };

  //  改变页码
  changePageNumber = (pageNumber) => {
    this.loadTableData({pageNumber});
  };

  // 每行操作处理
  onRowOperation = (type, data) => {
    const {history} = this.props;
    const {operId} = data;
    switch (type) {
      case 'EXPRESS':
        this.loadCurtainMail(operId, () => {
          this.setState({showModal: true, modalId: operId});
        });
        break;
      case 'TRAIL':
        history.push(`/trail/detail/${operId}`);
        break;
      case 'CHECK':
        history.push(`/check/detail/1`);
        break;
      case 'AUTHORITY':
        history.push(`/authority/detail/1`);
        break;
    }
  };

  // 关闭模态框
  onClose = (reload = false) => {
    this.setState({showModal: false}, () => {
      if (reload) {
        const {history} = this.props;
        history.push('/mail');
      }
    });
  };

  // 页面渲染
  render() {
    const {status, searchText, pageSize, pageNumber, totalSize, showModal, modalId} = this.state;

    return (
      <div>
        <MainHeader title={this.title} />
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
            value={searchText}
            onChangeValue={this.onSearch} />
        </div>
        <Pagination
          style={{marginTop: 12}}
          pageSize={pageSize}
          pageNumber={pageNumber}
          totalSize={totalSize}
          onPageNumberSwitch={this.changePageNumber} />
        <Table
          theadData={this.setTheadData()}
          tbodyData={this.setTbodyData()}
          pageSize={pageSize}
          pageNumber={pageNumber}
          totalSize={totalSize}
          onItemOperationClick={this.onRowOperation} />
        <Pagination
          type='simple'
          pageSize={pageSize}
          pageNumber={pageNumber}
          totalSize={totalSize}
          onPageSizeSwitch={this.changePageSize}
          onPageNumberSwitch={this.changePageNumber} />
        {showModal ? this.renderModal(modalId) : ''}
      </div>
    );
  }
}

export default BaseContainer;
