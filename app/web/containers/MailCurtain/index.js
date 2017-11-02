import React from 'react';
import BaseContainer, {setSelectAll} from '../BaseContainer';
import Modal from '../../components/Modal';
import InputBox from '../../components/InputBox';
import Card from '../../components/Card';
import Info from '../../components/Info';
import message from '../../components/Message';
import apis from '../../utils/apis';

const MAIL_STATUS = [
  {value: '', text: '全部'},
  {value: 10050, text: '待寄送'}
];
const EXPRESS_INFO = [
  {label: '幕布邮寄地址', content: '上海市浦东新区杨高南路729号1号楼33楼'},
  {label: '邮政编码', content: '200000'},
  {label: '联系人姓名', content: '王彬彬'},
  {label: '手机号码', content: '1801767879'},
  {label: '电话号码', content: '021-76765676-9'}
];

class MailCurtain extends BaseContainer {
  constructor(props) {
    super(props);
    this.title = '邮寄幕布';
    this.selectOptions = MAIL_STATUS;
    this.selectAll = setSelectAll(MAIL_STATUS);
    this.errorMsg = '获取邮寄幕布列表失败，请刷新重试';
    this.operations = [{type: 'EXPRESS', text: '填写快递单号'}];
    this.param = {};
  }

  // 邮寄幕布
  onConfirm = () => {
    apis.setCurtainDelivery(this.param).then(res => {
      console.log(res);
      message.success('快递单号填写完成，已标记为已寄送，请尽快寄送');
    }).catch(() => {
      message.error('邮寄幕布失败，请刷新重试');
    });
  };

  // 填写快递信息
  handleBlur = (key) => {
    return (v) => {
      this.param[key] = v;
    };
  };

  // 渲染模态框
  renderModal = (operId) => {
    this.param.operId = operId;
    return (
      <Modal width={720} showState onCloseClick={this.onClose} onSubmitClick={this.onConfirm}>
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
    EXPRESS_INFO.forEach((props, i) => {
      infoList.push(<Info {...props} key={i} />);
    });
    return infoList;
  };
}

export default MailCurtain;
