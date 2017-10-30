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

const HOST_ID = 0;
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
    content: (result, key) => {
      // const kv = validate.formatData(result, key);
      return '';
      /*
      try {
        return JSON.parse(kv).value;
      } catch {
        console.log(`failed to parse auditContent: ${kv}`);
        return '';
      }
      */
    }
  },
  /* {key: '5', label: <i>&nbsp;</i>, content: ''}, */
  {key: 'webSiteBasicInfoDto.serviceContent', label: '网站服务内容'},
  {key: 'webSiteBasicInfoDto.language', label: '网站语言'},
  {key: 'webSiteManagerInfoDto.name', label: '网站负责人姓名'},
  {key: 'webSiteManagerInfoDto.credentialType', label: '证件类型'},
  {key: 'webSiteManagerInfoDto.credentialNumber', label: '证件号码'},
  {key: 'webSiteManagerInfoDto.mobilePhone', label: '手机号码'},
  {key: 'webSiteManagerInfoDto.email', label: '电子邮箱'}
];
const HOST_FRAMES = [
  {shadeText: '工商营业执照', download: true},
  {shadeText: '身份证（正面）'},
  {shadeText: '身份证（反面）'}
];
const WEBSITE_FRAMES = [
  {shadeText: '身份证（正面）'},
  {shadeText: '身份证（反面）'},
  {shadeText: '核验单'},
  {shadeText: '前置审批文件'}
];

class RecordTrailDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkMode: false,
      hostInfo: null,
      listWebSiteInfo: null
    };
  }

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
  }

  shouldComponentUpdate(nextProps, nextState) {
    const stateKey = Object.keys(nextState).find(k => nextState[k] !== this.state[k]);
    return !validate.isNil(stateKey);
  }

  getOperID = () => {
    const {match} = this.props;
    return match.params.id;
  };

  handleChange = (k, id) => {
    return (v) => {
      // without manager
      if (validate.isNil(id)) return;
      if (!this.model.hasOwnProperty(id)) this.model[id] = [];
      if (v) {
        this.model[id].push(k);
      } else {
        const i = this.model[id].findIndex((elm) => (elm === k));
        this.model[id].splice(i, 1);
      }
    };
  };

  onCheckMode = (checkMode) => {
    return () => {
      this.setState({checkMode});
    };
  };

  onReject = () => {
    const {history} = this.props;
    const data = {
      operId: this.getOperID(),
      rejectReason: JSON.stringify(this.setRejectReason()),
      filingStatus: 10060
    };

    apis.setInitVerify(data).then(() => {
      history.push('/');
    }).catch(() => {
      message.error('初审验证失败，请刷新重试');
    });
  };

  setRejectReason = () => {
    const FIELD_MAP = {
      hostUnitFullDto: {name: 'hostInfo'},
      hostUnitManagerDto: {name: 'hostInfo'},
      webSiteBasicInfoDto: {name: 'websiteInfo', multiple: true},
      webSiteManagerInfoDto: {name: 'websiteInfo', multiple: true}
    };
    const reason = {};

    Object.keys(this.model).forEach(id => {
      const series = this.model[id];
      const warnItems = [];
      let key = null;
      if (series instanceof Array) {
        series.forEach(item => {
          const ks = item.split('.');
          const {name, multiple} = FIELD_MAP[ks[0]];
          const v = ks[ks.length - 1];
          key = name;
          if (!reason.hasOwnProperty(name)) reason[key] = [];
          multiple ? warnItems.push(v) : reason[key].push(v);
        });
      } else {
        reason[id] = series;
      }
      if (warnItems.length > 0) reason[key].push({id, warnItems});
    });

    return reason;
  };

  initModel = () => {
    const {checkMode} = this.state;
    this.model = checkMode ? {rejectReason: '信息有误，请重新填写'} : null;
  };

  renderFrames = (className, data) => {
    const {checkMode} = this.state;
    const frames = [];
    data.forEach((d, i) => {
      const {shadeText, download = false} = d;
      const props = {shadeText, download, checkMode};
      if (checkMode) props.download = false;
      frames.push(<li key={i}><PhotoFrame {...props} /></li>);
    });
    return <ul className={className}>{frames}</ul>;
  };

  renderInfoList = (data, result, hasId = false) => {
    const {checkMode} = this.state;
    const infoList = [];
    data.forEach(d => {
      const {key, label, content} = d;
      const props = {key, label, checkMode};
      if (!validate.isNil(result)) {
        props.onChange = this.handleChange(key, hasId ? this.getID(result, key) : HOST_ID);
      }
      props.content = validate.isNil(content)
        ? validate.formatData(result, key)
        : (typeof content === 'function' ? content(result, key) : content);
      infoList.push(<Info {...props} />);
    });
    return infoList;
  };

  getID = (result, key) => {
    const ks = key.split('.');
    ks[1] = 'id';
    return validate.formatData(result, ks.join('.'));
  };

  renderTextarea = () => {
    const {checkMode} = this.state;
    return checkMode ? <Textarea
      className={styles.reason}
      width={635}
      height={150}
      header='请勾选需要用户修改的内容，并输入驳回理由'
      value={this.model.rejectReason}
      onBlur={this.handleChange('rejectReason')} /> : '';
  };

  renderButtons = () => {
    const {checkMode} = this.state;
    const btnGroup = checkMode ? [
      {key: 'cancel', text: '取消', type: 'default', onClick: this.onCheckMode(false)},
      {key: 'confirm', text: '确认驳回', onClick: this.onReject}
    ] : [
      {key: 'reject', text: '初审驳回', type: 'default', onClick: this.onCheckMode(true)},
      {key: 'resolve', text: '初审通过'}
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

  setCardTitle = (data, key, defaultTitle) => {
    const suffix = validate.formatData(data, key);
    if (validate.isEmpty(suffix)) return defaultTitle;
    return `${defaultTitle} - ${suffix}`;
  };

  renderWebsiteInfos = () => {
    const {listWebSiteInfo} = this.state;
    const websiteInfos = [];
    listWebSiteInfo && listWebSiteInfo.forEach((websiteInfo, i) => {
      const props = {
        key: i,
        title: this.setCardTitle(websiteInfo, 'webSiteBasicInfoDto.name', '网站信息'),
        style: {marginTop: 50},
        suffix: this.renderFrames(styles.websiteFrame, WEBSITE_FRAMES)
      };
      if (i === 0) props.classID = 'website';

      websiteInfos.push(
        <Card {...props}>
          {this.renderInfoList(WEBSITE_INFO_LIST, websiteInfo, true)}
        </Card>
      );
    });

    return websiteInfos;
  };

  render() {
    const {hostInfo} = this.state;
    this.initModel();
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
            suffix={this.renderFrames(styles.hostFrame, HOST_FRAMES)}
          >
            {this.renderInfoList(HOST_INFO_LIST, hostInfo)}
          </Card>
          {this.renderWebsiteInfos()}
        </div>
        {this.renderTextarea()}
        {this.renderButtons()}
      </div>
    );
  }
}

export default RecordTrailDetail;
