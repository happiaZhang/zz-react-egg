import styles from '../TrialDetail/index.scss';
import React from 'react';
import TrialDetail from '../TrialDetail';
import Breadcrumb from '../../components/Breadcrumb';
import MainHeader from '../MainHeader';
import Card from '../../components/Card';
import Info from '../../components/Info';
import PhotoFrame from '../../components/PhotoFrame';
import message from '../../components/Message';
import validate from '../../utils/validate';
import apis from '../../utils/apis';

const ROUTES = [
  {key: 'verify', to: '/verify', text: '申请列表'}
];
const WEBSITE_FRAMES = [
  {key: 'webSiteManagerInfo.photoPath', shadeText: '幕布照片', width: 337, height: 211},
  {key: 'idc', shadeText: '身份证', width: 337, height: 211}
];

class VerifyDetail extends TrialDetail {
  constructor(props) {
    super(props);
    this.state = {
      checkMode: false,
      hostType: null,
      hostUnitName: null,
      listWebSiteInfo: null
    };
    this.materialInfo = [];
  }

  componentDidMount() {
    this.initPage();
  }

  // 初始化页面
  initPage = () => {
    const operId = this.getOperId();

    // 获取主体信息
    apis.getHostInfoByID({operId}).then((data) => {
      const hostType = validate.formatData(data, 'hostUnitFullDto.hostUnitBasicDto.hostType');
      const hostUnitName = validate.formatData(data, 'hostUnitFullDto.hostUnitName');
      this.setState({hostType, hostUnitName});
    }).catch(() => {
      message.error('获取主体信息失败，请刷新重试');
    });

    // 获取网站信息
    apis.getWebsiteInfoByID({operId}).then((data) => {
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

  // 设置备案状态 (overwrite)
  setFilingStatus = (isResolve) => (isResolve ? 10090 : 10080);

  // 设置消息提醒 (overwrite)
  setMsg = (isResolve) => {
    const successMsg = `幕布照片已${isResolve ? '审核通过' : '驳回'}`;
    const errorMsg = `幕布照片${isResolve ? '审核' : '驳回'}失败，请刷新重试`;
    return {successMsg, errorMsg};
  };

  // 设置驳回理由 (overwrite)
  setRejectReason = () => {
    const result = {};
    const {rejectReason, materialInfo} = this;

    if (rejectReason.trim().length > 0) result.rejectReason = rejectReason;
    if (materialInfo.length > 0) result.materialInfo = materialInfo;

    return JSON.stringify(result);
  };

  // 渲染幕布照片
  renderSuffix = (siteId, managerId, photoPath) => {
    const {checkMode} = this.state;
    const frames = [];
    WEBSITE_FRAMES.forEach((props, i) => {
      const {key} = props;
      props.checkMode = !validate.isEmpty(managerId) && checkMode && key !== 'idc';
      props.onChange = this.handleSelected(siteId, managerId);
      props.src = photoPath;
      frames.push(<li key={i}><PhotoFrame {...props} /></li>);
    });
    return <ul className={styles.curtainFrame}>{frames}</ul>;
  };

  // 选择有误的幕布照片
  handleSelected = (siteId, managerId) => {
    return (checked) => {
      if (checked) {
        this.materialInfo.push({siteId, managerId});
      } else {
        const index = this.materialInfo.findIndex(m => (m.siteId === siteId));
        this.materialInfo.splice(index, 1);
      }
    };
  }

  // 渲染网站信息
  renderWebsiteInfo = () => {
    const {listWebSiteInfo} = this.state;
    const websiteInfoList = [];
    listWebSiteInfo && listWebSiteInfo.forEach(websiteInfo => {
      const {id, name, infoList, managerId, photoPath} = this.getWebsiteBrief(websiteInfo);
      const props = {
        key: id,
        title: validate.isEmpty(name) ? '备案网站' : `备案网站 - ${name}`,
        style: {marginTop: 50},
        suffix: this.renderSuffix(id, managerId, photoPath)
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
      {prop: 'name', key: 'webSiteBasicInfoDto.name'},
      {prop: 'managerId', key: 'webSiteManagerInfo.id'},
      {prop: 'photoPath', key: 'webSiteManagerInfo.photoPath'}
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

  render() {
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

export default VerifyDetail;
