import styles from '../TrialDetail/index.scss';
import React from 'react';
import TrialDetail from '../TrialDetail';
import Breadcrumb from '../../components/Breadcrumb';
import MainHeader from '../MainHeader';
import message from '../../components/Message';
import apis from '../../utils/apis';
import validate from '../../utils/validate';

const WEBSITE_PHOTOS = [
  {key: 'photoPath', shadeText: '幕布照片', width: 337, height: 211},
  {
    key: 'webSiteManagerPhotoFrontPath',
    shadeText: '身份证（正面）',
    width: 337,
    height: 211,
    nonCheck: true
  }
];
const WEBSITE_INFO_LIST = [
  {key: 'hostType', label: '备案性质'},
  {key: 'hostUnitName', label: '企业名称'},
  {key: 'siteManagerName', label: '网站负责人姓名'},
  {key: 'siteManagerCredentialType', label: '证件类型'},
  {key: 'siteManagerCredentialNumber', label: '证件号码'}
];

class VerifyDetail extends TrialDetail {
  constructor(props) {
    super(props);
    this.name = 'VerifyDetail';
    this.route = [{key: 'verify', to: '/verify', text: '审核幕布照片'}];
    this.initApi = apis.getVerifyInfo;
    this.rejFunc = apis.setFilingStatus;
  }

  // 设置备案状态 (overwrite)
  setFilingStatus = (isResolve) => (isResolve ? 10090 : 10080);

  // 设置消息提醒 (overwrite)
  setMsg = (isResolve) => (`幕布照片审核已${isResolve ? '通过' : '驳回'}`);

  // 定义驳回理由 (overwrite)
  setRejectReason = () => {
    const curtainInfo = [];
    Object.keys(this.site).forEach(siteId => {
      curtainInfo.push({siteId, managerId: this.site[siteId]});
    });

    return JSON.stringify({
      rejectReason: this.rejectReason,
      curtainInfo
    });
  }

  // 数据有效性检验（overwrite）
  validData = () => {
    // 验证是否输入驳回理由
    let isValid = !validate.isEmpty(this.rejectReason);
    if (!isValid) return isValid;

    // 验证是否勾选幕布照片
    isValid = !validate.isEmpty(this.site);
    if (!isValid) message.error('请至少选择一项驳回的幕布照片');
    return isValid;
  };

  // 选择信息项 （overwrite）
  checkInfoItem = (key, id) => {
    const {sites} = this.state;
    return (isChecked) => {
      if (validate.isEmpty(id)) return;
      if (isChecked) {
        this.site[id] = sites.find(s => s['site.id'] === id).siteManagerId;
      } else {
        delete this.site[id];
      }
    };
  };

  render() {
    const {sites} = this.state;
    const siteInfo = {
      data: sites,
      title: '备案网站',
      style: {marginTop: 50},
      photos: WEBSITE_PHOTOS,
      infoList: WEBSITE_INFO_LIST,
      photoClassName: styles.curtainFrame
    };
    return (
      <div className={styles.recordTrailDetail}>
        <Breadcrumb routes={this.route} style={{marginTop: 15}} />
        <MainHeader title='查看幕布照片' style={{paddingTop: 5}} />
        <div style={{width: 700, marginTop: -30}}>
          {this.renderCardInfo(siteInfo)}
        </div>
        {this.renderTextarea()}
        {this.renderButtons()}
      </div>
    );
  }
}

export default VerifyDetail;
