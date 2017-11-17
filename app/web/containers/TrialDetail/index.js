import styles from './index.scss';
import React from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import MainHeader from '../MainHeader';
import Anchor from '../../components/Anchor';
import Card from '../../components/Card';
import Info from '../../components/Info';
import PhotoFrame from '../../components/PhotoFrame';
import Button from '../../components/Button';
import Textarea from '../../components/Textarea';
import message from '../../components/Message';
import apis from '../../utils/apis';
import validate from '../../utils/validate';

const ROUTES = [
  {key: 'trial', to: '/trial', text: '备案初审'}
];
const ANCHORS = [
  {text: '主体信息', to: '#host'},
  {text: '网站信息', to: '#website'}
];
const HOST_INFO_LIST = [
  {key: 'hostUnitFullDto.hostUnitName', label: '主办单位或主办人名称'},
  {key: 'hostUnitFullDto.hostUnitBasicDto.hostType', label: '主办单位性质'},
  {key: 'hostUnitFullDto.hostUnitBasicDto.credentialType', label: '主办单位证件类型'},
  {key: 'hostUnitFullDto.hostUnitBasicDto.credentialNumber', label: '主办单位证件号码'},
  {key: 'hostUnitFullDto.residence', label: '主办单位证件住所'},
  {key: 'hostUnitFullDto.hostUnitBasicDto.region', label: '主办单位所属区域'},
  {key: 'hostUnitFullDto.address', label: '主办单位通讯地址'},
  {key: 'hostUnitFullDto.investor', label: '投资人或主管单位'},
  {key: 'hostUnitManagerDto.name', label: '负责人姓名'},
  {key: 'hostUnitManagerDto.credentialType', label: '负责人证件类型'},
  {key: 'hostUnitManagerDto.credentialNumber', label: '负责人证件号码'},
  {key: 'hostUnitManagerDto.officePhone', label: '办公室电话'},
  {key: 'hostUnitManagerDto.mobilePhone', label: '手机号码'},
  {key: 'hostUnitManagerDto.email', label: '电子邮箱地址'},
  {key: 'hostUnitManagerDto.remark', label: '备注'}
];
const WEBSITE_INFO_LIST = [
  {key: 'webSiteBasicInfoDto.name', label: '网站名称'},
  {key: 'webSiteBasicInfoDto.indexUrl', label: '网站首页URL'},
  {key: 'webSiteBasicInfoDto.verifiedDomain', label: '已验证域名'},
  {
    key: 'webSiteBasicInfoDto.auditContent',
    label: '前置或专项审批内容',
    content: (data, key) => {
      let cnt = validate.formatData(data, key);
      if (!validate.isEmpty(cnt)) cnt = JSON.parse(cnt).value;
      return cnt;
    }
  },
  {key: 'webSiteBasicInfoDto.serviceContent', label: '网站服务内容'},
  {key: 'webSiteBasicInfoDto.language', label: '网站语言'},
  {key: 'webSiteManagerInfoDto.name', label: '网站负责人姓名'},
  {key: 'webSiteManagerInfoDto.credentialType', label: '证件类型'},
  {key: 'webSiteManagerInfoDto.credentialNumber', label: '证件号码'},
  {key: 'webSiteManagerInfoDto.mobilePhone', label: '手机号码'},
  {key: 'webSiteManagerInfoDto.email', label: '电子邮箱'}
];
const MULTI_KEY = 'webSiteBasicInfoDto.verifiedDomain';
const HOST_FRAMES = [
  {key: 'hostBusinessLicensePhotoPath', shadeText: '工商营业执照'},
  {key: 'hostManagerIDPhotoPath', shadeText: '身份证'}
];
const WEBSITE_FRAMES = [
  {key: 'webSiteManagerPhotoPath', shadeText: '身份证'},
  {key: 'webSiteFilingVerifyPhotoPath', shadeText: '核验单'}
];
const KEYS_MAPPER = {
  hostUnitFullDto: 'hostUnit',
  hostUnitManagerDto: 'hostUnitManager',
  webSiteBasicInfoDto: 'websiteInfo',
  webSiteManagerInfoDto: 'websiteManagerInfo',
  hostBusinessLicensePhotoPath: 'hostManagerItems',
  hostManagerIDPhotoPath: 'hostManagerItems',
  webSiteManagerPhotoPath: 'webSitePhotoItems',
  webSiteFilingVerifyPhotoPath: 'webSitePhotoItems'
};
const ID_MAPPER = {
  webSiteBasicInfoDto: 'webSiteBasicInfoDto.id',
  webSiteManagerInfoDto: 'webSiteManagerInfoDto.id',
  webSiteManagerPhotoPath: 'id',
  webSiteFilingVerifyPhotoPath: 'id'
};

class TrialDetail extends React.Component {
  // 构造方法
  constructor(props) {
    super(props);
    this.state = {
      checkMode: false,
      hostInfo: null,
      listWebSiteInfo: null,
      materialInfo: null
    };
    this.rejectReason = '信息有误,请重新填写';
    this.hostUnit = [];
    this.hostUnitManager = [];
    this.websiteManagerInfo = {};
    this.websiteInfo = {};
    this.verifiedDomain = {};
    this.hostManagerItems = [];
    this.webSitePhotoItems = {};
    this.type = 'TrialDetail';
    this.route = ROUTES;
    this.anchor = ANCHORS;
    this.isAuditReject = false;
  }

  // 首次挂载组件
  componentDidMount() {
    const operId = this.getOperId();

    // 获取主体信息
    apis.getHostInfoByID({operId}).then(hostInfo => {
      this.setState({hostInfo});
    }).catch(() => {
      message.error('获取主体信息失败，请刷新重试');
    });

    // 获取网站信息
    if (this.type === 'RevokeSiteDetail' || this.type === 'RevokeAccessDetail') {
      const siteId = this.getSiteId();
      apis.getWebsiteInfo({operId, siteId}).then(data => {
        const {listWebSiteManagerInfo} = data;
        data.webSiteManagerInfoDto = listWebSiteManagerInfo[0] || {};
        this.setState({listWebSiteInfo: [data]});
      }).catch(() => {
        message.error('获取网站信息失败，请刷新重试');
      });
    } else {
      apis.getWebsiteInfoByID({operId}).then(data => {
        const {listWebSiteInfo} = data;
        listWebSiteInfo.forEach(websiteInfo => {
          const {listWebSiteManagerInfo} = websiteInfo;
          websiteInfo.webSiteManagerInfoDto = listWebSiteManagerInfo[0] || {};
        });
        this.setState({listWebSiteInfo});
      }).catch(() => {
        message.error('获取网站信息失败，请刷新重试');
      });
    }

    // 获取主体资料信息
    apis.getHostMaterial({operId}).then(materialInfo => {
      materialInfo && this.setState({materialInfo});
    }).catch(() => {
      message.error('获取主体资料信息失败，请刷新重试');
    });
  }

  // 是否重新渲染组件
  shouldComponentUpdate(nextProps, nextState) {
    const stateKey = Object.keys(nextState).find(k => nextState[k] !== this.state[k]);
    return !validate.isNil(stateKey);
  }

  // 获取主体Id
  getOperId = () => {
    const {match} = this.props;
    return match.params.id;
  };

  // 获取网站Id
  getSiteId = () => {
    const {match} = this.props;
    return match.params.siteId;
  };

  // 选择错误项
  checkWarningItem = (key, id, value) => {
    return (v) => {
      if (this[key] instanceof Array) {
        this.handleWarningItem(v, this[key], value);
      } else {
        if (validate.isEmpty(id)) return;
        if (!this[key].hasOwnProperty(id)) {
          this[key][id] = [];
        }
        this.handleWarningItem(v, this[key][id], value);
      }
    };
  };

  // 处理错误项
  handleWarningItem = (isChecked, items, value) => {
    if (isChecked) {
      items.push(value);
    } else {
      const index = items.findIndex(i => i === value);
      items.splice(index, 1);
    }
  }

  // 选择与非选择模式的切换
  onCheckMode = (checkMode) => {
    return () => {
      this.setState({checkMode});
    };
  };

  // 设置备案状态
  setFilingStatus = (isResolve) => (isResolve ? 10050 : 10060);

  // 设置消息提醒
  setMsg = (isResolve) => {
    const successMsg = `初审已${isResolve ? '通过' : '驳回'}`;
    const errorMsg = `初审${isResolve ? '通过' : '驳回'}失败，请刷新重试`;
    return {successMsg, errorMsg};
  };

  // 跳转到列表页
  switch2List = () => {
    const {history} = this.props;
    switch (this.type) {
      case 'TrialDetail':
        history.push('/trial');
        break;
      case 'VerifyDetail':
        history.push('/verify');
        break;
      case 'AuditReject':
        history.push('/audit');
        break;
    }
  };

  // 处理驳回或通过
  handleClick = (isResolve) => {
    const data = {
      checkPerson: 'ZhangZheng',
      operId: this.getOperId(),
      filingStatus: this.setFilingStatus(isResolve),
      rejectReason: ''
    };
    const {successMsg, errorMsg} = this.setMsg(isResolve);
    return () => {
      if (!isResolve) data.rejectReason = this.setRejectReason();
      apis.setFilingStatus(data).then(() => {
        message.success(successMsg, 3, this.switch2List);
      }).catch(() => {
        message.error(errorMsg);
      });
    };
  };

  // 设置驳回理由
  setRejectReason = () => {
    const result = {};
    const {
      rejectReason,
      hostUnit,
      hostUnitManager,
      websiteManagerInfo,
      websiteInfo,
      verifiedDomain,
      hostManagerItems,
      webSitePhotoItems
    } = this;

    if (rejectReason.trim().length > 0) result.rejectReason = rejectReason;

    if (hostUnit.length > 0) result.hostInfo = {hostUnit};
    if (hostUnitManager.length > 0) {
      if (result.hasOwnProperty('hostInfo')) {
        result.hostInfo.hostUnitManager = hostUnitManager;
      } else {
        result.hostInfo = {hostUnitManager};
      }
    }

    const websiteManagers = this.obj2Arr(websiteManagerInfo, 'warnItems');
    if (websiteManagers.length > 0) result.websiteManagerInfo = websiteManagers;

    const websites = this.obj2Arr(websiteInfo, 'otherItems');
    if (websites.length > 0) result.websiteInfo = websites;

    const domains = this.obj2Arr(verifiedDomain, 'verifiedDomain');
    if (domains.length > 0) {
      if (result.hasOwnProperty('websiteInfo')) {
        domains.forEach(d => {
          const {verifiedDomain} = d;
          const index = websites.findIndex(({id}) => (id === d.id));
          if (index > -1) {
            websites[index].verifiedDomain = verifiedDomain;
          } else {
            websites.push(d);
          }
        });
      } else {
        result.websiteInfo = domains;
      }
    }

    if (hostManagerItems.length > 0) result.materialInfo = {hostManagerItems};
    const websitePhotos = this.obj2Arr(webSitePhotoItems, 'warnItems');
    if (websitePhotos.length > 0) {
      if (result.hasOwnProperty('materialInfo')) {
        result.materialInfo.webSitePhotoItems = websitePhotos;
      } else {
        result.materialInfo = {webSitePhotoItems: websitePhotos};
      }
    }

    return JSON.stringify(result);
  };

  // 对象转数组
  obj2Arr = (obj, key) => {
    const arr = [];
    Object.keys(obj).forEach(id => {
      if (obj[id].length === 0) {
        delete obj.id;
      } else {
        arr.push({id, [key]: obj[id]});
      }
    });
    return arr;
  }

  // 渲染资料
  renderFrames = (className, frames, data) => {
    const {checkMode} = this.state;
    const list = [];
    frames.forEach((d, i) => {
      const {shadeText, key} = d;
      const id = this.setId(data, key);
      const props = {
        shadeText,
        checkMode,
        onChange: this.checkWarningItem(KEYS_MAPPER[key], id, key),
        src: validate.formatData(data, key)
      };
      list.push(<li key={i}><PhotoFrame {...props} /></li>);
    });
    return <ul className={className}>{list}</ul>;
  };

  // 渲染主体与网站信息列表项
  renderInfoList = (infoList, data) => {
    const {checkMode} = this.state;
    const list = [];
    infoList.forEach(info => {
      const {key, label, content} = info;
      const props = {key, label, checkMode};
      const isMult = key === MULTI_KEY;
      const ks = key.split('.');
      const id = this.setId(data, ks[0]);
      const value = isMult && content ? content() : ks[ks.length - 1];
      props.onChange = this.checkWarningItem(isMult ? 'verifiedDomain' : KEYS_MAPPER[ks[0]], id, value);
      props.content = content ? content(data, key) : validate.formatData(data, key);
      list.push(<Info {...props} />);
    });
    return list;
  };

  // 设置标识id
  setId = (data, key) => {
    let id = '';
    if (ID_MAPPER[key]) {
      id = validate.formatData(data, ID_MAPPER[key]);
    }
    return id;
  };

  // 渲染错误理由文本框
  renderTextarea = () => {
    const {checkMode} = this.state;
    return (checkMode || this.isAuditReject) ? <Textarea
      className={styles.reason}
      width={635}
      height={150}
      header='请勾选需要用户修改的内容，并输入驳回理由'
      value={this.rejectReason}
      onBlur={this.setReason} /> : null;
  };

  // 设置拒绝理由
  setReason = (v) => {
    this.rejectReason = v;
  };

  // 渲染驳回与通过操作按钮
  renderButtons = () => {
    if (this.type === 'AuditDetail') return null;
    const {checkMode} = this.state;

    let rejectText = null;
    let resolveText = null;
    switch (this.type) {
      case 'TrialDetail':
        rejectText = '初审驳回';
        resolveText = '初审通过';
        break;
      case 'VerifyDetail':
        rejectText = '审核驳回';
        resolveText = '审核通过';
        break;
    }

    const btnGroup = (checkMode || this.isAuditReject) ? [
      {key: 'cancel', text: '取消', type: 'default', onClick: this.onCheckMode(false)},
      {key: 'confirm', text: '确认驳回', onClick: this.handleClick(false)}
    ] : [
      {key: 'reject', text: rejectText, type: 'default', onClick: this.onCheckMode(true)},
      {key: 'resolve', text: resolveText, onClick: this.handleClick(true)}
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

  // 设置主体或网站标题
  setCardTitle = (data, key, defaultTitle) => {
    const suffix = validate.formatData(data, key);
    if (validate.isEmpty(suffix)) return defaultTitle;
    return `${defaultTitle} - ${suffix}`;
  };

  // 渲染网站信息
  renderWebsiteInfoList = () => {
    const {listWebSiteInfo, materialInfo} = this.state;
    const websiteList = [];
    listWebSiteInfo && listWebSiteInfo.forEach((websiteInfo, i) => {
      const webSiteId = websiteInfo.webSiteBasicInfoDto.id;
      let webSiteMaterial = null;
      if (materialInfo) {
        const {webSiteManagerMaterialList} = materialInfo;
        webSiteMaterial = webSiteManagerMaterialList.find(webSite => (webSite.id === webSiteId));
      }
      const props = {
        key: i,
        title: this.setCardTitle(websiteInfo, 'webSiteBasicInfoDto.name', '网站信息'),
        style: {marginTop: 50},
        suffix: this.renderFrames(styles.websiteFrame, WEBSITE_FRAMES, webSiteMaterial)
      };
      if (i === 0) props.classID = 'website';

      websiteList.push(
        <Card {...props}>
          {this.renderInfoList(this.genWebsiteInfo(websiteInfo), websiteInfo)}
          {this.renderCurtain(websiteInfo)}
        </Card>
      );
    });

    return websiteList;
  };

  // 渲染备案密码
  renderPassword = () => {
    if (this.type === 'RevokeHostDetail' || this.type === 'RevokeSiteDetail' || this.type === 'RevokeAccessDetail') {
      const {hostInfo} = this.state;
      const filingPassword = validate.formatData(hostInfo, 'hostUnitFullDto.filingPassword');
      return (
        <Card title='备案密码' style={{marginTop: 50}} classID='password'>
          <Info label='备案密码' content={filingPassword} />
        </Card>
      );
    } else {
      return null;
    }
  };

  // 渲染网站幕布照片
  renderCurtain = (websiteInfo) => {
    if (this.type !== 'AuditDetail' && this.type !== 'AuditReject') return null;
    const {checkMode} = this.state;
    const props = {
      key: 'webSiteManagerInfoDto.photoPath',
      shadeText: '幕布照片',
      width: 337,
      height: 211,
      checkMode
    };
    props.src = validate.formatData(websiteInfo, props.key);
    return (
      <div>
        <h5 style={{lineHeight: '34px'}}>幕布照片</h5>
        <PhotoFrame {...props} />
      </div>
    );
  };

  // 生成网站信息列表
  genWebsiteInfo = (websiteInfo) => {
    const websiteInfoList = [];
    WEBSITE_INFO_LIST.forEach(info => {
      const {key, label} = info;
      if (key === MULTI_KEY) {
        const kv = validate.formatData(websiteInfo, key);
        if (kv === '') {
          websiteInfoList.push(info);
        } else {
          kv.split(',').forEach((d, i) => {
            websiteInfoList.push({
              key,
              label: i === 0 ? label : <i>&nbsp;</i>,
              content: () => (d)
            });
          });
        }
      } else {
        websiteInfoList.push(info);
      }
    });
    return websiteInfoList;
  };

  // 渲染页面
  render() {
    const {hostInfo, materialInfo} = this.state;
    return (
      <div className={styles.recordTrailDetail}>
        <Breadcrumb routes={this.route} style={{marginTop: 15}} />
        <MainHeader title='查看备案信息' style={{paddingTop: 5}} />
        <Anchor items={this.anchor} activeKey='#host' style={{marginTop: 30}} />
        <div style={{width: 500}}>
          <Card
            classID='host'
            title={this.setCardTitle(hostInfo, 'hostUnitFullDto.hostUnitName', '主体信息')}
            style={{marginTop: 20}}
            suffix={this.renderFrames(styles.hostFrame, HOST_FRAMES, materialInfo)}
          >
            {this.renderInfoList(HOST_INFO_LIST, hostInfo)}
          </Card>
          {this.renderWebsiteInfoList()}
          {this.renderPassword()}
        </div>
        {this.renderTextarea()}
        {this.renderButtons()}
      </div>
    );
  }
}

export default TrialDetail;
