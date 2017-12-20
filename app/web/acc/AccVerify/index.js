import styles from './index.scss';
import React from 'react';
import MainHeader from '../../icp/MainHeader/index';
import Select from '../../components/Select/index';
import Search from '../../components/Search/index';
import Pagination from '../../components/Pagination/index';
import Table from '../../components/Table/index';
import message from '../../components/Message/index';
import api from '../api';

const VERIFY_STATUS = {
  PENDING: '待审批',
  PASS: '审批通过',
  REJECT: '审批拒绝'
};

class AccVerify extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      verify: '',
      searchText: '',
      pageSize: 10,
      pageNumber: 1,
      totalSize: 0,
      elements: []
    };
  }

  componentWillMount() {
    this.genSelectOptions();
  }

  componentDidMount() {
    this.loadTableData();
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
    this._timer && clearTimeout(this._timer);
  }

  // 加载表格数据
  loadTableData = (newState) => {
    const {verify, searchText, pageSize, pageNumber} = this.state;
    const params = {verify, searchText, pageSize, pageNumber, ...newState};
    api.getUserVerifyRecord(params).then(data => {
      this.setState({
        ...params,
        ...data
      });
    }).catch(err => {
      message.error(err);
    });
  }

  // 生成下拉框选项
  genSelectOptions = () => {
    this.selectOptions = [{value: '', text: '全部'}];
    Object.keys(VERIFY_STATUS).forEach(k => {
      this.selectOptions.push({value: k, text: VERIFY_STATUS[k]});
    });
  };

  // 改变下拉框状态
  changeVerifyStatus = (verify) => {
    this.loadTableData({verify});
  };

  // 条件搜索
  onSearch = (searchText) => {
    this.setState({searchText});
    this.timer && clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.loadTableData({searchText});
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
      this.loadTableData({pageNumber});
    }, 300);
  };

  // 设置表头内容
  setTheadData = () => {
    return [
      {text: '公司名称', value: 'company_name'},
      {text: '姓名', value: 'name'},
      {text: '手机号', value: 'mobile'},
      {text: '行业', value: 'industry'},
      {text: '绑定邮箱', value: 'email'},
      {text: '实名认证', value: 'ID_verify'},
      {
        text: '状态',
        value: 'verifyName',
        render: (value, item) => {
          const {verify} = item;
          return <div className={`${styles.verifyStatus} ${styles[verify]}`}>{item[value]}</div>;
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
      elm.operations = [{type: 'DETAIL', text: '查看详情'}];
      return elm;
    });
  };

  // 每行操作处理
  onRowOperation = (type, data) => {
    const {history} = this.props;
    if (type === 'DETAIL') {
      history.push(`/detail/${data.PWID}`);
    }
  };

  // 页面渲染
  render() {
    const {verify, searchText, pageSize, pageNumber, totalSize} = this.state;

    return (
      <div style={{minWidth: 520}}>
        <MainHeader title={'内测用户审核'} />
        <div className={styles.tableOperation}>
          <div className={styles.left}>
            <Select
              style={{width: 140}}
              data={this.selectOptions}
              value={verify}
              onChangeValue={this.changeVerifyStatus} />
          </div>
          <Search
            placeholder='请输入姓名'
            value={searchText}
            onChangeValue={this.onSearch} />
        </div>
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

export default AccVerify;
