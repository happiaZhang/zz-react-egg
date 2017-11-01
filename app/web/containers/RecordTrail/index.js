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

const TRAIL_STATUS = [
  {value: '', text: '全部'},
  {value: 10040, text: '待初审'},
  {value: 10060, text: '已驳回'}
];
const THEAD_DATA = [
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
      const status = TRAIL_STATUS.find(s => s.value === item[value]);
      return status.text;
    }
  },
  {text: '操作', value: 'OPERATION_COLUMN', width: 60}
];

class RecordTrail extends React.Component {
  // 构造方法
  constructor(props) {
    super(props);
    this.state = {
      status: '',
      searchText: '',
      pageSize: 10,
      totalSize: 0,
      pageNumber: 1,
      elements: []
    };
    this.selectAll = this.setSelectAll();
  }

  // 设置下拉框为全部时，status所应取的值
  setSelectAll = () => {
    const all = [];
    TRAIL_STATUS.forEach(({value}) => {
      if (!validate.isEmpty(value)) all.push(value);
    });
    return all;
  };

  // 组件渲染完成
  componentDidMount() {
    // 加载列表
    this.getRecordTrailList();
  }

  // 组件将消失
  componentWillUnmount() {
    this.searchTimer && clearTimeout(this.searchTimer);
  }

  //  改变初审状态
  changeStatus = (status) => {
    this.getRecordTrailList({status});
  };

  //  条件搜索
  onSearch = (operId) => {
    this.setState({searchText: operId});
    this.searchTimer && clearTimeout(this.searchTimer);
    this.searchTimer = setTimeout(() => {
      this.getRecordTrailList({operId});
    }, 500);
  };

  //  改变每页显示数量
  changePageSize = (pageSize) => {
    this.getRecordTrailList({pageSize});
  };

  //  改变页码
  changePageNumber = (pageNumber) => {
    this.getRecordTrailList({pageNumber});
  };

  //  每行操作处理
  onRowOperation = (type, data) => {
    const {history} = this.props;
    const {operId} = data;
    switch (type) {
      case 'LOOK':
        history.push(`/trail/detail/${operId}`);
        break;
    }
  };

  //  获取初审列表
  getRecordTrailList = (newState = {}) => {
    const {pageSize, pageNumber, status} = this.state;
    const params = {operId: '', status, pageSize, pageNumber, ...newState};

    apis.getRecordTrailList(this.convertParams(params)).then(res => {
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
      message.error('获取备案初审列表失败，请刷新重试');
    });
  };

  convertParams = (params) => {
    if (validate.isEmpty(params.status)) return {...params, status: this.selectAll};
    return params;
  };

  setTbodyData = () => {
    const {elements} = this.state;
    if (elements.length === 0) return elements;
    return elements.map(elm => {
      elm.operations = [{type: 'LOOK', text: '查看'}];
      return elm;
    });
  };

  //  页面渲染
  render() {
    const {status, searchText, pageSize, pageNumber, totalSize} = this.state;

    return (
      <div>
        <MainHeader title='备案初审' />
        <div className={styles.tableOperation}>
          <div className={styles.left}>
            <Select
              style={{width: 140}}
              data={TRAIL_STATUS}
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
          theadData={THEAD_DATA}
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
      </div>
    );
  }
}

export default RecordTrail;
