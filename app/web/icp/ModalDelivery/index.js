import React from 'react';
import Modal from '../../components/Modal/index';
import FormGroup from '../../components/FormGroup/index';
import Input from '../../components/Input/index';
import Card from '../../components/Card/index';
import Info from '../../components/Info/index';
import message from '../../components/Message/index';
import apis from '../../utils/apis';
import validate from '../../utils/validate';

const DELIVERY_INFO = [
  {key: 'address', label: '幕布邮寄地址'},
  {key: 'postCode', label: '邮政编码'},
  {key: 'name', label: '联系人姓名'},
  {key: 'mobile', label: '手机号码'},
  {key: 'fixedPhone', label: '电话号码'}
];

class ModalDelivery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      curtainMailDto: {},
      disabled: true,
      warningKey: null
    };
    this.param = {
      operId: props.operId,
      deliveryId: '',
      deliveryCompany: ''
    };
  }

  componentDidMount() {
    const {operId} = this.props;
    // 加载幕布邮寄信息
    apis.getCurtainInfo({operId}).then((res) => {
      const {curtainMailDto} = res;
      this.setState({curtainMailDto, disabled: false});
    }).catch(error => {
      message.error(error);
    });
  }

  // 验证输入数据
  isInvalid = () => {
    let invalid = false;
    ['deliveryId', 'deliveryCompany'].forEach(warningKey => {
      if (!invalid) {
        invalid = validate.isEmpty(this.param[warningKey]);
        invalid && this.setState({warningKey});
      }
    });
    return invalid;
  };

  // 邮寄幕布
  onConfirm = () => {
    const {callback} = this.props;
    if (this.isInvalid()) return;
    apis.setCurtainDeliveryInfo(this.param).then(() => {
      this.onClose();
      message.success('快递单号已填写完成，请尽快寄送', 2, callback);
    }).catch(error => {
      message.error(error);
    });
  };

  // 关闭模态框
  onClose = () => {
    const {onClose} = this.props;
    onClose && onClose();
  };

  // 填写快递信息
  handleBlur = (key) => {
    return (v) => {
      this.param[key] = v;
    };
  };

  // 渲染输入框
  renderInputBox = () => {
    const {warningKey} = this.state;
    const items = [
      {
        label: '快递单号',
        required: true,
        formStyle: {width: 300},
        component: Input,
        placeholder: '请填写准确的快递单号',
        onBlur: this.handleBlur('deliveryId'),
        warningMsg: '请输入快递单号',
        warning: warningKey === 'deliveryId'
      },
      {
        label: '快递公司',
        required: true,
        formStyle: {width: 300, marginLeft: 20},
        component: Input,
        placeholder: '请填写快递公司，如顺丰速运',
        onBlur: this.handleBlur('deliveryCompany'),
        warningMsg: '请输入快递公司名称',
        warning: warningKey === 'deliveryCompany'
      }
    ];

    const list = [];
    items.forEach((props, i) => {
      list.push(<FormGroup key={i} {...props} />);
    });

    return <div style={{display: 'flex', marginBottom: 10}}>{list}</div>;
  };

  // 渲染邮寄人信息
  renderInfoList = () => {
    const {curtainMailDto} = this.state;
    const infoList = [];
    DELIVERY_INFO.forEach(props => {
      const {key} = props;
      const content = curtainMailDto[key] || '';
      infoList.push(<Info {...props} content={content} />);
    });
    return infoList;
  };

  render() {
    const {disabled} = this.state;
    const footer = [
      {key: 'cancel', text: '取消', type: 'default', onClick: this.onClose},
      {key: 'confirm', text: '确定', type: 'primary', onClick: this.onConfirm, disabled}
    ];
    return (
      <Modal width={720} showState onCloseClick={this.onClose} footer={footer}>
        {this.renderInputBox()}
        <Card>{this.renderInfoList()}</Card>
      </Modal>
    );
  }
}

export default ModalDelivery;
