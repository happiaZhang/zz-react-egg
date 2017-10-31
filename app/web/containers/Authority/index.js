import styles from '../RecordTrail/index.scss';
import React from 'react';
import MainHeader from '../MainHeader';
import Select from '../../components/Select';
import Search from '../../components/Search';
import Pagination from '../../components/Pagination';
import Table from '../../components/Table';

const AUTHORITY_STATUS = [
  {value: '', text: '全部'},
  {value: 'readyToAuthority', text: '待管局审核'},
  {value: 'finished', text: '已完成'}
];
const THEAD_DATA = [
  {text: '申请ID', value: 'operId'},
  {text: '备案服务号', value: 'filingServiceNo'},
  {text: '关联域名', value: 'website'},
  {text: '备案类型', value: 'recordType'},
  {text: '备案主体', value: 'hostname'},
  {text: '最近更新时间', value: 'updateTime'},
  {text: '状态', value: 'operStatus'},
  {text: '操作', value: 'OPERATION_COLUMN', width: 40}
];
const MOCK_DATA = [
  {
    operId: 253086,
    filingServiceNo: 253086,
    website: 'wandacloud.cn',
    recordType: '首次备案',
    hostname: '万达云计算有限公司',
    updateTime: '2017-08-08 13:44',
    operStatus: '待管局审核',
    operations: [{type: 'LOOK', text: '填写备案号'}]
  },
  {
    operId: 263636,
    filingServiceNo: 263636,
    website: 'wandacloud.cn',
    recordType: '新增接入',
    hostname: '万达云计算有限公司',
    updateTime: '2017-08-08 13:44',
    operStatus: '待管局审核',
    operations: [{type: 'LOOK', text: '填写备案号'}]
  },
  {
    operId: 363636,
    filingServiceNo: 363636,
    website: 'wandacloud.cn',
    recordType: '新增网站',
    hostname: '万达云计算有限公司',
    updateTime: '2017-08-08 13:44',
    operStatus: '备案完成',
    operations: [{type: 'LOOK', text: '填写备案号'}]
  },
  {
    operId: 253086,
    filingServiceNo: 253086,
    website: 'wandacloud.cn',
    recordType: '首次备案',
    hostname: '万达云计算有限公司',
    updateTime: '2017-08-08 13:44',
    operStatus: '备案完成',
    operations: [{type: 'LOOK', text: '填写备案号'}]
  }
];

class Authority extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: '',
      searchText: '',
      pageSize: 10,
      pageNumber: 1,
      totalSize: 1
    };
  }

  changeStatus = (v) => {
    console.log(v);
  };

  onSearch = (v) => {
    console.log(v);
  };

  changePageSize = () => {

  };

  changePageNumber = () => {

  };

  onRowOperation = (type) => {
    const {history} = this.props;
    switch (type) {
      case 'LOOK':
        history.push(`/authority/detail/1`);
        break;
    }
  };

  render() {
    const {status, searchText, pageSize, pageNumber, totalSize} = this.state;

    return (
      <div>
        <MainHeader title='管局审核' />
        <div className={styles.tableOperation}>
          <div className={styles.left}>
            <Select
              style={{width: 140}}
              showLines={3}
              data={AUTHORITY_STATUS}
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
          onPageSizeSwitch={this.changePageSize}
          onPageNumberSwitch={this.changePageNumber} />
        <Table
          theadData={THEAD_DATA}
          tbodyData={MOCK_DATA}
          pageSize={pageSize}
          pageNumber={pageNumber}
          totalSize={totalSize}
          onItemOperationClick={this.onRowOperation} />
        <Pagination
          type='simple'
          pageSize={pageSize}
          pageNumber={pageNumber}
          totalSize={totalSize}
          onPageNumberSwitch={this.changePageNumber} />
      </div>
    );
  }
}

export default Authority;
