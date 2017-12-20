import React from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import Card from '../../components/Card';
import Info from '../../components/Info';
import MainHeader from '../../icp/MainHeader';
import ButtonGroup from '../../components/ButtonGroup';
import message from '../../components/Message';
import Notification from '../../components/Notification';
import ModalAlert from '../ModalAlert';
import apis from '../../utils/apis';
import datetime from '../../components/Datepicker/datetime';

const ACCOUNT_INFO = [
  {key: 'company_name', label: '公司名称'},
  {key: 'industry', label: '行业'},
  {key: 'ID_verify', label: '实名认证'},
  {key: 'email_active', label: '绑定邮箱'},
  {key: 'email', label: '邮箱地址'},
  {key: 'name', label: '姓名'},
  {key: 'ID_number', label: '身份证号码'},
  {key: 'mobile', label: '手机号'}
];

class AccVerifyDetail extends React.Component {
  constructor(props) {
    super(props);
    this.route = [
      {key: 'acc', to: '/', text: '返回列表'}
    ];
    this.state = {
      account: {}
    };
  }

  componentDidMount() {
    this.loadAccountInfo();
  }

  loadAccountInfo = () => {
    const PWID = this.getId();
    apis.getUserVerifyRecord({PWID}).then(data => {
      const {elements} = data;
      if (elements.length > 0) this.setState({account: elements[0]});
    }).catch(err => {
      message.error(err);
    });
  };

  getId = () => {
    const {match} = this.props;
    return match.params.id;
  };

  renderCardInfo = () => {
    return (
      <Card title={'账户信息'}>
        {this.renderInfoList()}
      </Card>
    );
  }

  // 渲染主体与网站信息列表项
  renderInfoList = () => {
    const {account} = this.state;
    const list = [];

    ACCOUNT_INFO.forEach(info => {
      const {key, label} = info;
      const props = {key, label, labelWidth: '45%'};
      props.content = account[key] || '';
      list.push(<Info {...props} />);
    });

    return list;
  };

  renderBtnGroup = () => {
    const {account} = this.state;
    if (account.verify && account.verify === 'PENDING') {
      const btns = [
        {key: 'reject', text: '审核拒绝', type: 'default', onClick: this.onReject},
        {key: 'pass', text: '审核通过', onClick: this.onPass}
      ];
      return <ButtonGroup btns={btns} style={{marginTop: 35}} />;
    }
    return null;
  };

  onReject = () => {
    apis.genModal({
      show: true,
      data: {
        component: ModalAlert,
        header: '确定要审批拒绝吗？',
        content: '审批拒绝后系统会自动发送一封邮件至用户的邮箱。邀请用户等万达云正式上线后再来使用。',
        callback: this.handleVerifyStatus(true)
      }
    });
  };

  onPass = () => {
    apis.genModal({
      show: true,
      data: {
        name: 'ModalAlert',
        header: '确定要审批通过吗？',
        content: '审批通过后系统会自动发送一封邀请邮件至用户的邮箱。',
        callback: this.handleVerifyStatus(false)
      }
    });
  };

  handleVerifyStatus = (isReject) => {
    const PWID = this.getId();
    const verify = isReject ? 'REJECT' : 'PASS';
    return () => {
      apis.setUserVerifyRecord({PWID, verify}).then(data => {
        const {code} = data;
        if (code === '0') {
          apis.genModal({show: false});
          message.info('操作成功，邮件已发送', 2, () => {
            this.loadAccountInfo();
          });
        }
      }).catch(err => {
        message.error(err);
      });
    };
  };

  getAccountType = () => {
    const {verify, verify_time} = this.state.account;
    const result = {type: ''};
    if (verify) {
      const time = datetime.format(new Date(verify_time), 'yyyy年MM月dd日 hh时mm分ss秒');
      switch (verify) {
        case 'PENDING':
          result.type = 'info';
          result.content = `（注册日期：${time}）`;
          break;
        case 'PASS':
          result.type = 'success';
          result.content = `（审批通过日期：${time}）`;
          break;
        case 'REJECT':
          result.type = 'error';
          result.content = `（审批拒绝日期：${time}）`;
          break;
      }
    }
    return result;
  };

  render() {
    const {account} = this.state;
    const {type, content} = this.getAccountType();
    return (
      <div>
        <Breadcrumb routes={this.route} style={{marginTop: 15}} />
        <MainHeader title='用户详情' style={{paddingTop: 5}} />
        <div style={{maxWidth: 850}}>
          <Notification title={account.verifyName || ''} type={type} style={{marginTop: 30, marginBottom: 20}}>
            {content ? <span style={{marginLeft: 5}}>{content}</span> : null}
          </Notification>
          {this.renderCardInfo()}
        </div>
        {this.renderBtnGroup()}
      </div>
    );
  }
}

export default AccVerifyDetail;
