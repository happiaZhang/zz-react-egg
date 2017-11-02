import React from 'react';
import BaseContainer, {setSelectAll} from '../BaseContainer';
import Modal from '../../components/Modal';
import InputBox from '../../components/InputBox';
import Card from '../../components/Card';
import Info from '../../components/Info';

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
  }

  onConfirm = () => {
    console.log(123);
  };

  renderModal = () => {
    return (
      <Modal width={720} showState onCloseClick={this.onClose} onSubmitClick={this.onConfirm}>
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
    EXPRESS_INFO.forEach((props, i) => {
      infoList.push(<Info {...props} key={i} />);
    });
    return infoList;
  };
}

export default MailCurtain;
