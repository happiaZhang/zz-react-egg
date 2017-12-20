import styles from '../TrialDetail/index.scss';
import React from 'react';
import TrialDetail from '../TrialDetail';
import Breadcrumb from '../../components/Breadcrumb';
import MainHeader from '../MainHeader';
import FormGroup from '../../components/FormGroup';
import Input from '../../components/Input';
import message from '../../components/Message';
import api from '../api';
import validate from '../../utils/validate';

const HOST_INFO_LIST = [
  {key: 'hostUnitName', label: '主办单位'},
  {key: 'hostType', label: '主办单位性质'},
  {key: 'hostCredentialType', label: '主办单位证件类型'},
  {key: 'hostCredentialNumber', label: '主办单位证件号码'}
];
const SITE_INFO_LIST = [
  {key: 'siteName', label: '网站名称'},
  {key: 'siteIndexUrl', label: '网站首页URL'},
  {
    key: 'siteVerifiedDomain',
    label: '已验证域名',
    parser: (key, label, data, other) => {
      const result = [];
      const domain = data[key] || '';
      domain.split(',').forEach((d, i) => {
        result.push({
          key: key + '_' + d,
          label: i === 0 ? label : <i>&nbsp;</i>,
          content: d,
          other
        });
      });
      return result;
    }
  }
];

class AuditResolve extends TrialDetail {
  constructor(props) {
    super(props);
    this.state.warningKey = null;
    this.name = 'AuditResolve';
    this.route = [
      {key: 'audit', to: '/audit', text: '管局审核'}
    ];
    this.initApi = api.getAuditResolveInfo;
    this.host = {};
    this.siteIds = [];
  }

  isInvalid = () => {
    const operId = this.getOperId();
    let isInvalid = validate.isEmpty(this.host) || validate.isEmpty(this.host[operId]);
    if (isInvalid) {
      this.setState({warningKey: 'host.' + operId});
      return true;
    }

    const counter = this.siteIds.length;
    for (let i = 0; i < counter; i++) {
      const id = this.siteIds[i];
      if (validate.isEmpty(this.site) || validate.isNil(this.site[id]) || validate.isEmpty(this.site[id])) {
        this.setState({warningKey: 'site.' + id});
        isInvalid = true;
        break;
      }
    }
    return isInvalid;
  };

  onAudit = () => {
    if (this.isInvalid()) return;

    const data = {operId: this.getOperId()};
    Object.keys(this.host).forEach(operId => {
      data.hostFilingNo = this.host[operId];
    });

    const filingSiteNoDtoList = [];
    Object.keys(this.site).forEach(siteId => {
      filingSiteNoDtoList.push({
        siteFilingNo: this.site[siteId],
        siteId: parseInt(siteId)
      });
    });

    data.filingSiteNoDtoList = filingSiteNoDtoList;

    api.setFilingNo(data).then(() => {
      message.success('备案号保存成功', 2, () => {
        this.switch2List();
      });
    }).catch(error => {
      message.error(error);
    });
  };

  // 生成按钮组 （overwrite）
  genBtnGroup = () => {
    this.btnGroup = [
      {key: 'confirm', text: '确定', onClick: this.onAudit}
    ];
  };

  handleFilingNo = (isHost, id) => {
    return (v) => {
      if (isHost) {
        this.host[id] = v;
      } else {
        this.site[id] = v;
      }
    };
  }

  // overwrite
  renderPhoto = (photos, data, isHost) => {
    let label = '主体备案号';
    let id = this.getOperId();
    const siteName = data.siteName || '';

    if (!isHost) {
      label = '网站备案号';
      id = data.siteId || '';
    }

    if (!validate.isEmpty(siteName)) label += ` (${siteName})`;

    const props = {
      label,
      required: true,
      component: Input,
      warningMsg: `请输入${label}`,
      warning: this.state.warningKey === `${isHost ? 'host' : 'site'}.${id}`,
      warningScroll: true,
      onBlur: this.handleFilingNo(isHost, id)
    };
    return <div className={styles.photoFrame} style={{width: 180}}>
      <FormGroup {...props} />
    </div>;
  };

  collectSiteIds = (sites) => {
    this.siteIds.length = 0;
    sites.forEach(site => {
      this.siteIds.push(site.siteId);
    });
  };

  render() {
    const {host, sites} = this.state;
    const hostInfo = {
      data: [host],
      title: '备案主体',
      style: {marginTop: 20},
      infoList: HOST_INFO_LIST,
      photoClassName: true // alternation
    };
    const siteInfo = {
      data: sites,
      title: '备案网站',
      style: {marginTop: 50},
      infoList: SITE_INFO_LIST,
      photoClassName: false // alternation
    };

    this.collectSiteIds(sites);

    return (
      <div className={styles.recordTrailDetail}>
        <Breadcrumb routes={this.route} style={{marginTop: 15}} />
        <MainHeader title='填写备案号' style={{paddingTop: 5}} />
        <div style={{width: 500}}>
          {this.renderCardInfo(hostInfo)}
          {this.renderCardInfo(siteInfo)}
        </div>
        {this.renderButtons()}
      </div>
    );
  }
}

export default AuditResolve;
