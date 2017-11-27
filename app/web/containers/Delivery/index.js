import React from 'react';
import BaseContainer from '../BaseContainer';
import Modal from '../../components/Modal';
import InputBox from '../../components/InputBox';
import Card from '../../components/Card';
import Info from '../../components/Info';
import message from '../../components/Message';
import apis from '../../utils/apis';

const DELIVERY_INFO = [
  {key: 'address', label: '幕布邮寄地址'},
  {key: 'postCode', label: '邮政编码'},
  {key: 'name', label: '联系人姓名'},
  {key: 'mobile', label: '手机号码'},
  {key: 'fixedPhone', label: '电话号码'}
];

class Delivery extends BaseContainer {
  constructor(props) {
    super(props);
    this.title = '邮寄幕布';
    this.selectAll = [10055];
    this.selectOptions = this.genOptions();
    this.state.filingType = [1, 2, 3, 4];
    this.implOperation = this.loadCurtain;
  }

  // 加载幕布邮寄信息
  loadCurtain = (operId) => {
    apis.getCurtainInfo({operId}).then((res) => {
      this.curtainMailDto = res.curtainMailDto;
      this.param = {operId, checkPerson: 'zhangzheng'};
      this.setState({showModal: true});
    }).catch(error => {
      message.error(error);
    });
  };

  // 驳回邮寄
  onReject = () => {
    this.setState({showModal: false});
  };

  // 邮寄幕布
  onConfirm = () => {
    apis.setCurtainDeliveryInfo(this.param).then(() => {
      this.onClose();
      message.success('快递单号填写完成，已标记为已寄送，请尽快寄送', 2, () => {
        const {history} = this.props;
        history.push('/delivery');
      });
    }).catch((error) => {
      message.error(error);
    });
  };

  // 关闭模态框
  onClose = () => {
    this.setState({showModal: false});
  };

  // 填写快递信息
  handleBlur = (key) => {
    return (v) => {
      this.param[key] = v;
    };
  };

  // 渲染模态框
  renderModal = () => {
    const footer = [
      {key: 'cancel', text: '取消', type: 'default', onClick: this.onReject},
      {key: 'confirm', text: '确定', type: 'primary', onClick: this.onConfirm}
    ];
    return (
      <Modal width={720} showState onCloseClick={this.onClose} footer={footer}>
        {this.renderInputBox()}
        <Card>{this.renderInfoList()}</Card>
      </Modal>
    );
  };

  // 渲染输入框
  renderInputBox = () => {
    const inputBoxes = [
      {
        key: 'deliveryCompany',
        label: '快递公司',
        inputPlaceholder: '请填写快递公司，如顺丰速运',
        onBlur: this.handleBlur('deliveryCompany')
      },
      {
        key: 'deliveryId',
        label: '快递单号',
        inputPlaceholder: '请填写准确的快递单号',
        onBlur: this.handleBlur('deliveryId'),
        style: {marginLeft: 20}
      }
    ];

    const list = [];
    inputBoxes.forEach(props => {
      list.push(<InputBox {...props} />);
    });

    return <div style={{display: 'flex', marginBottom: 10}}>{list}</div>;
  };

  // 渲染邮寄人信息
  renderInfoList = () => {
    const infoList = [];
    DELIVERY_INFO.forEach(props => {
      const {key} = props;
      const content = this.curtainMailDto ? this.curtainMailDto[key] || '' : '';
      infoList.push(<Info {...props} content={content} />);
    });
    return infoList;
  };
}

export default Delivery;
