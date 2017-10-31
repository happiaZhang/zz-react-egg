import styles from '../RecordTrail/index.scss';
import React from 'react';
import MainHeader from '../MainHeader';
import Select from '../../components/Select';
import Search from '../../components/Search';
import Pagination from '../../components/Pagination';
import Table from '../../components/Table';
import Modal from '../../components/Modal';
import InputBox from '../../components/InputBox';
import Card from '../../components/Card';
import Info from '../../components/Info';

const MAIL_STATUS = [
  {value: '', text: '全部'},
  {value: 'readyToMail', text: '待寄送'},
  {value: 'haveMailed', text: '已寄送'}
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
    operStatus: '待寄送',
    operations: [{type: 'LOOK', text: '填写快递单号'}]
  },
  {
    operId: 263636,
    filingServiceNo: 263636,
    website: 'wandacloud.cn',
    recordType: '新增接入',
    hostname: '万达云计算有限公司',
    updateTime: '2017-08-08 13:44',
    operStatus: '待寄送',
    operations: [{type: 'LOOK', text: '填写快递单号'}]
  },
  {
    operId: 363636,
    filingServiceNo: 363636,
    website: 'wandacloud.cn',
    recordType: '新增网站',
    hostname: '万达云计算有限公司',
    updateTime: '2017-08-08 13:44',
    operStatus: '已寄送',
    operations: [{type: 'LOOK', text: '填写快递单号'}]
  },
  {
    operId: 253086,
    filingServiceNo: 253086,
    website: 'wandacloud.cn',
    recordType: '首次备案',
    hostname: '万达云计算有限公司',
    updateTime: '2017-08-08 13:44',
    operStatus: '已寄送',
    operations: [{type: 'LOOK', text: '填写快递单号'}]
  }
];
const MAIL_INFOS = [
  {label: '幕布邮寄地址', content: '上海市浦东新区杨高南路729号1号楼33楼'},
  {label: '邮政编码', content: '200000'},
  {label: '联系人姓名', content: '王彬彬'},
  {label: '手机号码', content: '1801767879'},
  {label: '电话号码', content: '021-76765676-9'}
];

class MailCurtain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: '',
      searchText: '',
      pageSize: 10,
      pageNumber: 1,
      totalSize: 1,
      showModal: false
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
    switch (type) {
      case 'LOOK':
        this.setState({showModal: true});
        break;
    }
  };

  onClose = () => {
    this.setState({showModal: false});
  };

  renderModal = () => {
    return (
      <Modal width={720} showState onCloseClick={this.onClose}>
        <div style={{display: 'flex', marginBottom: 10}}>
          <InputBox label='快递公司' inputPlaceholder='请填写快递公司，如顺丰速运' />
          <InputBox label='快递单号' inputPlaceholder='请填写准确的快递单号' style={{marginLeft: 20}} />
        </div>
        <Card>{this.renderInfoList()}</Card>
      </Modal>
    );
  };

  renderInfoList = () => {
    const infoList = [];
    MAIL_INFOS.forEach((props, i) => {
      infoList.push(<Info {...props} key={i} />);
    });
    return infoList;
  };

  render() {
    const {status, searchText, pageSize, pageNumber, totalSize, showModal} = this.state;

    return (
      <div>
        <MainHeader title={'邮寄幕布'} />
        <div className={styles.tableOperation}>
          <div className={styles.left}>
            <Select
              style={{width: 140}}
              showLines={3}
              data={MAIL_STATUS}
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
        {showModal ? this.renderModal() : ''}
      </div>
    );
  }
}

export default MailCurtain;
