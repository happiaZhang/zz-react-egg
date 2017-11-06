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
  {key: 'recordTrail', to: '/', text: '备案初审'}
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
const HOST_FRAMES = [
  {key: 'hostBusinessLicensePhotoPath', shadeText: '工商营业执照'},
  {key: 'hostManagerIDPhotoFrontPath', shadeText: '身份证（正面）'},
  {key: 'hostManagerIDPhotoBackPath', shadeText: '身份证（反面）'}
];
const WEBSITE_FRAMES = [
  {key: 'webSiteIDPhotoFrontPath', shadeText: '身份证（正面）'},
  {key: 'webSiteIDPhotoBackPath', shadeText: '身份证（反面）'},
  {key: 'webSiteFilingVerifyPhotoPath', shadeText: '核验单'}
];

class RecordTrailDetail extends React.Component {
  // 构造方法
  constructor(props) {
    super(props);
    this.state = {
      checkMode: false,
      hostInfo: null,
      listWebSiteInfo: null,
      materialInfo: null
    };
  }

  // 首次挂载组件
  componentDidMount() {
    const id = this.getOperID();

    // 获取主体信息
    apis.getHostInfoByID(id).then(hostInfo => {
      this.setState({hostInfo});
    }).catch(() => {
      message.error('获取主体信息失败，请刷新重试');
    });

    // 获取网站信息
    apis.getWebsiteInfoByID(id).then(data => {
      const {listWebSiteInfo} = data;
      listWebSiteInfo.forEach(websiteInfo => {
        const {listWebSiteManagerInfo} = websiteInfo;
        websiteInfo.webSiteManagerInfoDto = listWebSiteManagerInfo[0] || {};
      });
      this.setState({listWebSiteInfo});
    }).catch(() => {
      message.error('获取网站信息失败，请刷新重试');
    });

    // 获取主体资料信息
    apis.getHostMaterial(id).then(materialInfo => {
      this.setState({materialInfo});
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
  getOperID = () => {
    const {match} = this.props;
    return match.params.id;
  };

  // 选择错误项
  checkWarningItem = (k, symbol) => {
    return (v) => {
      if (validate.isNil(symbol)) return;
      if (!this.model.hasOwnProperty(symbol)) this.model[symbol] = [];
      if (v) {
        this.model[symbol].push(k);
      } else {
        const i = this.model[symbol].findIndex(elm => (elm === k));
        this.model[symbol].splice(i, 1);
      }
    };
  };

  // 选择与非选择模式的切换
  onCheckMode = (checkMode) => {
    return () => {
      this.setState({checkMode});
    };
  };

  // 处理初审驳回或初审通过
  handleTrail = (isResolved) => {
    const {history} = this.props;
    const data = {
      operId: this.getOperID(),
      filingStatus: isResolved ? 10050 : 10060,
      checkPerson: 'ZhangZheng'
    };
    const errMsg = `初审${isResolved ? '通过' : '驳回'}失败，请刷新重试`;
    return () => {
      if (!isResolved) data.rejectReason = JSON.stringify(this.setRejectModel());
      apis.setInitVerify(data).then(() => {
        history.push('/');
      }).catch(() => {
        message.error(errMsg);
      });
    };
  };

  // 设置驳回数据模型
  setRejectModel = () => {
    const result = {};

    Object.keys(this.model).forEach(k => {
      const hasUnderline = k.indexOf('_') > -1;
      if (hasUnderline) {
        const ks = k.split('_');
        const kk = ks[0];
        const id = ks[1];
        if (!result.hasOwnProperty(kk)) result[kk] = [];
        result[kk].push({
          id,
          warnItems: this.model[k]
        });
      } else {
        result[k] = this.model[k];
      }
    });

    Object.keys(result).forEach(k => {
      const hasDot = k.indexOf('.') > -1;
      if (hasDot) {
        const data = result[k];
        const ks = k.split('.');
        const k1 = ks[0];
        const k2 = ks[1];
        if (!result.hasOwnProperty(k1)) result[k1] = {};
        result[k1][k2] = data;
        delete result[k];
      }
    });

    return result;
  };

  // 初始化驳回数据模型
  initRejectModel = () => {
    const {checkMode} = this.state;
    this.model = checkMode ? {rejectReason: '信息有误，请重新填写'} : null;
  };

  // 渲染资料
  renderFrames = (className, frames, data) => {
    const {checkMode} = this.state;
    const list = [];
    frames.forEach((d, i) => {
      const {shadeText, key} = d;
      const props = {
        shadeText,
        checkMode,
        onChange: this.checkWarningItem(key, this.setSymbol(data, key)),
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
      const ks = key.split('.');
      const itemKey = ks[ks.length - 1];
      props.onChange = this.checkWarningItem(itemKey, this.setSymbol(data, key));
      props.content = content ? content(data, key) : validate.formatData(data, key);
      list.push(<Info {...props} />);
    });
    return list;
  };

  // 设置标识
  setSymbol = (data, key) => {
    if (validate.isNil(data)) return null;

    const ks = key.split('.');
    ks.length = 1;
    const keyMap = {
      hostUnitFullDto: {symbol: 'hostInfo.hostUnit'},
      hostUnitManagerDto: {symbol: 'hostInfo.hostUnitManager'},
      webSiteBasicInfoDto: {symbol: 'websiteInfo', idKey: 'webSiteBasicInfoDto.id'},
      webSiteManagerInfoDto: {symbol: 'websiteManagerInfo', idKey: 'webSiteManagerInfoDto.id'},
      hostBusinessLicensePhotoPath: {symbol: 'materialInfo.hostManagerItems'},
      hostManagerIDPhotoFrontPath: {symbol: 'materialInfo.hostManagerItems'},
      hostManagerIDPhotoBackPath: {symbol: 'materialInfo.hostManagerItems'},
      webSiteIDPhotoFrontPath: {symbol: 'materialInfo.webSitePhotoItems', idKey: 'id'},
      webSiteIDPhotoBackPath: {symbol: 'materialInfo.webSitePhotoItems', idKey: 'id'},
      webSiteFilingVerifyPhotoPath: {symbol: 'materialInfo.webSitePhotoItems', idKey: 'id'}
    };

    const {symbol, idKey} = keyMap[ks[0]];
    if (idKey) {
      const id = validate.formatData(data, idKey);
      return validate.isEmpty(id) ? null : symbol + '_' + id;
    } else {
      return symbol;
    }
  };

  // 渲染错误理由文本框
  renderTextarea = () => {
    const {checkMode} = this.state;
    return checkMode ? <Textarea
      className={styles.reason}
      width={635}
      height={150}
      header='请勾选需要用户修改的内容，并输入驳回理由'
      value={this.model.rejectReason}
      onBlur={this.setReason} /> : '';
  };

  // 设置拒绝理由
  setReason = (v) => {
    this.model.rejectReason = v;
  };

  // 渲染驳回与通过操作按钮
  renderButtons = () => {
    const {checkMode} = this.state;
    const btnGroup = checkMode ? [
      {key: 'cancel', text: '取消', type: 'default', onClick: this.onCheckMode(false)},
      {key: 'confirm', text: '确认驳回', onClick: this.handleTrail(false)}
    ] : [
      {key: 'reject', text: '初审驳回', type: 'default', onClick: this.onCheckMode(true)},
      {key: 'resolve', text: '初审通过', onClick: this.handleTrail(true)}
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
          {this.renderInfoList(WEBSITE_INFO_LIST, websiteInfo)}
        </Card>
      );
    });

    return websiteList;
  };

  // 渲染页面
  render() {
    const {hostInfo, materialInfo} = this.state;
    this.initRejectModel();
    return (
      <div className={styles.recordTrailDetail}>
        <Breadcrumb routes={ROUTES} style={{marginTop: 15}} />
        <MainHeader title='查看备案信息' style={{paddingTop: 5}} />
        <Anchor items={ANCHORS} activeKey='#host' style={{marginTop: 30}} />
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
        </div>
        {this.renderTextarea()}
        {this.renderButtons()}
      </div>
    );
  }
}

export default RecordTrailDetail;
