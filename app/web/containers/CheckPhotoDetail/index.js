import styles from '../RecordTrailDetail/index.scss';
import React from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import MainHeader from '../MainHeader';
import Card from '../../components/Card';
import Info from '../../components/Info';
import PhotoFrame from '../../components/PhotoFrame';
import Button from '../../components/Button';
import Textarea from '../../components/Textarea';
import message from '../../components/Message';
import validate from '../../utils/validate';
import apis from '../../utils/apis';

const ROUTES = [
  {key: 'checkPhoto', to: '/check', text: '申请列表'}
];
const WEBSITE_FRAMES = [
  {shadeText: '幕布照片', width: 337, height: 211},
  {shadeText: '身份证（正面）', width: 337, height: 211}
];

class CheckPhotoDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkMode: false,
      hostType: null,
      hostUnitName: null,
      listWebSiteInfo: null
    };
  }

  componentDidMount() {
    this.initPage();
  }

  shouldComponentUpdate(nextProps, nextState) {
    const stateKey = Object.keys(nextState).find(k => nextState[k] !== this.state[k]);
    return !validate.isNil(stateKey);
  }

  // 初始化页面
  initPage = () => {
    const {match} = this.props;
    const id = match.params.id;

    // 获取主体信息
    apis.getHostInfoByID(id).then((data) => {
      const hostType = validate.formatData(data, 'hostUnitFullDto.hostUnitBasicDto.hostType');
      const hostUnitName = validate.formatData(data, 'hostUnitFullDto.hostUnitName');
      this.setState({hostType, hostUnitName});
    }).catch(() => {
      message.error('获取主体信息失败，请刷新重试');
    });

    // 获取网站信息
    apis.getWebsiteInfoByID(id).then((data) => {
      const {listWebSiteInfo} = data;
      listWebSiteInfo.forEach(webSiteInfo => {
        const {listWebSiteManagerInfo} = webSiteInfo;
        webSiteInfo.webSiteManagerInfo = listWebSiteManagerInfo[0] || {};
      });
      this.setState({listWebSiteInfo});
    }).catch(() => {
      message.error('获取网站信息失败，请刷新重试');
    });
  };

  renderList = (data) => {
    const list = [];
    data.forEach((props, i) => {
      list.push(<Info {...props} key={i} />);
    });
    return list;
  };

  // 渲染驳回理由
  renderTextarea = () => {
    const {checkMode} = this.state;
    return checkMode ? <Textarea
      className={styles.reason}
      width={635}
      height={150}
      header='请勾选需要用户修改的内容，并输入驳回理由'
      value='信息有误，请重新填写'
    /> : '';
  };

  // 渲染操作的按钮组
  renderButtons = () => {
    const {checkMode} = this.state;
    const btnGroup = checkMode ? [
      {key: 'cancel', text: '取消', type: 'default', onClick: this.onCheckMode(false)},
      {key: 'confirm', text: '确认驳回', onClick: this.onReject}
    ] : [
      {key: 'reject', text: '审核驳回', type: 'default', onClick: this.onCheckMode(true)},
      {key: 'resolve', text: '审核通过', onClick: this.onResolved}
    ];
    return (
      <div className={styles.toolBar}>
        {
          btnGroup.map(props => {
            return <Button {...props} />;
          })
        }
      </div>
    );
  };

  // 获取主体ID
  getOperId = () => {
    const {match} = this.props;
    return match.params.id;
  };

  // 跳转到列表页
  refresh = () => {
    const {history} = this.props;
    history.push('/check');
  };

  // 向后台发送驳回申请
  onReject = () => {
    const operId = this.getOperId();
    this.model.operId = operId;
    this.model.checkPerson = 'ZhangZheng';
    apis.setCurtainRejection(this.model).then(() => {
      this.refresh();
    }).catch(() => {
      message.error('申请幕布驳回失败，请刷新重试');
    });
  }

  // 向后台发送审核通过消息
  onResolved = () => {
    const filingStatus = 10090;
    const operId = this.getOperId();
    const checkPerson = 'ZhangZheng';

    apis.setInitVerify({filingStatus, operId, checkPerson}).then(() => {
      this.refresh();
    }).catch(() => {
      message.error('审核通过失败，请刷新重试');
    });
  }

  // 审核驳回
  onCheckMode = (checkMode) => {
    return () => {
      this.setState({checkMode});
    };
  };

  // 渲染幕布照片
  renderSuffix = (managerId) => {
    const {checkMode} = this.state;
    const frames = [];
    WEBSITE_FRAMES.forEach((props, i) => {
      props.checkMode = !validate.isEmpty(managerId) && checkMode;
      props.onChange = this.handleSelected(managerId);
      frames.push(<li key={i}><PhotoFrame {...props} /></li>);
    });
    return <ul className={styles.curtainFrame}>{frames}</ul>;
  };

  // 选择有误的幕布
  handleSelected = (managerId) => {
    return (checked) => {
      if (checked) {
        this.model.managerId = managerId;
      } else {
        delete this.model.managerId;
      }
    };
  }

  // 渲染网站信息
  renderWebsiteInfo = () => {
    const {listWebSiteInfo} = this.state;
    const websiteInfoList = [];
    listWebSiteInfo && listWebSiteInfo.forEach(websiteInfo => {
      const {id, title, infoList, managerId} = this.getWebsiteBrief(websiteInfo);
      const props = {
        key: id,
        title: validate.isEmpty(title) ? '备案网站' : `备案网站 - ${title}`,
        style: {marginTop: 50},
        suffix: this.renderSuffix(managerId)
      };

      websiteInfoList.push(
        <Card {...props}>
          {this.renderList(infoList)}
        </Card>
      );
    });

    return websiteInfoList;
  };

  // 获取网站的概要信息
  getWebsiteBrief = (websiteInfo) => {
    const obj = {infoList: []};
    const briefList = [
      {label: '备案性质', key: 'hostType', isHost: true},
      {label: '企业名称', key: 'hostUnitName', isHost: true},
      {label: '网站负责人姓名', key: 'webSiteManagerInfo.name'},
      {label: '证件类型', key: 'webSiteManagerInfo.credentialType'},
      {label: '证件号码', key: 'webSiteManagerInfo.credentialNumber'},
      {prop: 'id', key: 'webSiteBasicInfoDto.id'},
      {prop: 'title', key: 'webSiteBasicInfoDto.name'},
      {prop: 'managerId', key: 'webSiteManagerInfo.id'}
    ];
    briefList.forEach(info => {
      const {label, isHost = false, key, prop} = info;
      if (isHost) {
        info.content = validate.isNil(this.state[key]) ? '' : this.state[key];
      } else {
        info.content = validate.formatData(websiteInfo, key);
      }
      if (label) {
        obj.infoList.push(info);
      } else {
        obj[prop] = info.content;
      }
    });
    return obj;
  };

  // 初始化驳回数据模型
  initRejectModel = () => {
    const {checkMode} = this.state;
    this.model = checkMode ? {rejectReason: '信息有误，请重新填写'} : null;
  };

  render() {
    this.initRejectModel();
    return (
      <div className={styles.recordTrailDetail}>
        <Breadcrumb routes={ROUTES} style={{marginTop: 15}} />
        <MainHeader title='查看幕布照片' style={{paddingTop: 5}} />
        <div style={{width: 700, marginTop: -30}}>
          {this.renderWebsiteInfo()}
        </div>
        {this.renderTextarea()}
        {this.renderButtons()}
      </div>
    );
  }
}

export default CheckPhotoDetail;
