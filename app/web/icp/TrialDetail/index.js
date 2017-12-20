import styles from './index.scss';
import React from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import MainHeader from '../MainHeader';
import Anchor from '../../components/Anchor';
import Card from '../../components/Card';
import Info from '../../components/Info';
import PhotoFrame from '../../components/PhotoFrame';
import ButtonGroup from '../../components/ButtonGroup';
import FormGroup from '../../components/FormGroup';
import Input from '../../components/Input';
import message from '../../components/Message';
import api from '../api';
import validate from '../../utils/validate';
import {AUDIT_INDUSTRY} from '../constants';

const HOST_INFO_LIST = [
  {key: 'host.hostUnitName', label: '主办单位或主办人名称'},
  {key: 'host.hostType', label: '主办单位性质'},
  {key: 'host.credentialType', label: '主办单位证件类型'},
  {key: 'host.credentialNumber', label: '主办单位证件号码'},
  {key: 'host.residence', label: '主办单位证件住所'},
  {key: 'host.region', label: '主办单位所属区域'},
  {key: 'host.address', label: '主办单位通讯地址'},
  {key: 'host.investor', label: '投资人或主管单位'},
  {key: 'hostManager.name', label: '负责人姓名'},
  {key: 'hostManager.credentialType', label: '负责人证件类型'},
  {key: 'hostManager.credentialNumber', label: '负责人证件号码'},
  {key: 'hostManager.officePhone', label: '办公室电话'},
  {key: 'hostManager.mobilePhone', label: '手机号码'},
  {key: 'hostManager.email', label: '电子邮箱地址'},
  {key: 'hostManager.remark', label: '备注'}
];

const WEBSITE_INFO_LIST = [
  {key: 'site.name', label: '网站名称'},
  {key: 'site.indexUrl', label: '网站首页URL'},
  {
    key: 'site.verifiedDomain',
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
  },
  {key: 'site.auditContent', label: '前置或专项审批内容'},
  {
    key: 'site.auditFiles',
    label: <i>&nbsp;</i>,
    parser: (key, label, data, other) => {
      const result = [];
      const files = data[key] ? JSON.parse(data[key]) : [];
      files.forEach(f => {
        const {name, approvalNumber, approvalFile} = f;
        other.photoKey = `${key}_${name}|approvalFile`;
        result.push({
          key: `${key}_${name}|approvalNumber`,
          label: <i>&nbsp;</i>,
          content: (checkMode, onChange) => {
            const props = {
              shadeText: '前置审批文件',
              src: approvalFile,
              checkMode,
              onChange
            };
            return (
              <div style={{marginBottom: 10}}>
                <p>{`${AUDIT_INDUSTRY[name]}, ${approvalNumber}`}</p>
                <PhotoFrame {...props} />
              </div>
            );
          },
          other
        });
      });
      return result;
    }
  },
  {key: 'site.serviceContent', label: '网站服务内容'},
  {key: 'site.language', label: '网站语言'},
  {key: 'siteManager.name', label: '网站负责人姓名'},
  {key: 'siteManager.credentialType', label: '证件类型'},
  {key: 'siteManager.credentialNumber', label: '证件号码'},
  {key: 'siteManager.mobilePhone', label: '手机号码'},
  {key: 'siteManager.email', label: '电子邮箱'}
];

const HOST_PHOTOS = [
  {key: 'host.hostBusinessLicensePhotoPath', shadeText: '工商营业执照'},
  {key: 'host.hostManagerIDPhotoFrontPath', shadeText: '身份证（正面）'},
  {key: 'host.hostManagerIDPhotoBackPath', shadeText: '身份证（反面）'}
];

const WEBSITE_PHOTOS = [
  {key: 'site.webSiteManagerPhotoFrontPath', shadeText: '身份证（正面）'},
  {key: 'site.webSiteManagerPhotoBackPath', shadeText: '身份证（反面）'},
  {key: 'site.webSiteFilingVerifyPhotoPath', shadeText: '核验单'}
];

class TrialDetail extends React.Component {
  // 构造方法
  constructor(props) {
    super(props);
    this.state = {
      checkMode: false,
      host: {},
      sites: [{}],
      showBtn: false
    };
    this.name = 'TrialDetail';
    this.route = [
      {key: 'trial', to: '/trial', text: '备案初审'}
    ];
    this.anchor = [
      {text: '主体信息', to: 'host'},
      {text: '网站信息', to: 'website'}
    ];
    this.initApi = api.getTrialInfo;
    this.host = [];
    this.site = {};
    this.rejFunc = api.setTrailStatus;
  }

  // 首次挂载组件
  componentDidMount() {
    const operId = this.getOperId();
    this.initApi({operId}).then(data => {
      const {host = {}, sites} = data;
      this.setState({host, sites, showBtn: true});
    }).catch(error => {
      message.error(error);
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

  // 选择与非选择模式的切换
  onCheckMode = (checkMode) => {
    return () => {
      this.setState({checkMode});
    };
  };

  // 设置备案状态
  setFilingStatus = (isResolve) => (isResolve ? 10050 : 10060);

  // 设置消息提醒
  setMsg = (isResolve) => (`初审已${isResolve ? '通过' : '驳回'}`);

  // 跳转到列表页
  switch2List = () => {
    const {history} = this.props;
    history.push(this.route[0].to);
  };

  // 定义驳回理由
  setRejectReason = () => {
    return JSON.stringify({
      rejectReason: this.rejectReason,
      host: this.host,
      site: this.site
    });
  }

  // 数据有效性验证
  validData = () => {
    // 验证是否输入驳回理由
    let isValid = !validate.isEmpty(this.rejectReason);
    if (!isValid) return isValid;

    // 验证是否勾选了主体信息
    if (!validate.isEmpty(this.host)) return true;
    // 验证是否勾选了网站信息
    Object.keys(this.site).forEach(id => {
      if (validate.isEmpty(this.site[id])) delete this.site.id;
    });
    isValid = !validate.isEmpty(this.site);
    if (!isValid) message.error('请至少选择一项用户所需要修改的内容');
    return isValid;
  };

  // 处理驳回或通过
  handleClick = (isResolve) => {
    const data = {
      operId: this.getOperId(),
      filingStatus: this.setFilingStatus(isResolve),
      rejectReason: ''
    };
    return () => {
      if (!isResolve) data.rejectReason = this.setRejectReason();
      if (!isResolve && !this.validData()) return;
      this.rejFunc(data).then(() => {
        message.success(this.setMsg(isResolve), 2, this.switch2List);
      }).catch(error => {
        message.error(error);
      });
    };
  };

  // 渲染错误理由
  renderTextarea = () => {
    const {checkMode} = this.state;

    if (checkMode || this.name === 'AuditReject') {
      this.rejectReason = '信息有误，请重新填写';
      const props = {
        formStyle: {marginTop: 35},
        required: true,
        label: '请勾选需要用户修改的内容，并输入驳回理由',
        value: this.rejectReason,
        component: Input,
        type: 'TEXTAREA',
        style: {
          width: 635,
          height: 150
        },
        onBlur: this.setReason,
        warningMsg: '请输入驳回理由'
      };
      return <FormGroup {...props} />;
    }

    return null;
  };

  // 设置拒绝理由
  setReason = (v) => {
    this.rejectReason = v;
  };

  // 生成按钮组
  genBtnGroup = () => {
    const {checkMode} = this.state;
    const text = {
      reject: '初审驳回',
      resolve: '初审通过'
    };

    if (this.name === 'VerifyDetail') {
      text.reject = '审核驳回';
      text.resolve = '审核通过';
    }

    this.btnGroup = checkMode ? [
      {key: 'cancel', text: '取消', type: 'default', onClick: this.onCheckMode(false)},
      {key: 'confirm', text: '确认驳回', onClick: this.handleClick(false)}
    ] : [
      {key: 'reject', text: text.reject, type: 'default', onClick: this.onCheckMode(true)},
      {key: 'resolve', text: text.resolve, onClick: this.handleClick(true)}
    ];
  };

  // 渲染驳回与通过操作按钮
  renderButtons = () => {
    const {showBtn} = this.state;
    if (this.name === 'AuditDetail' || !showBtn) return null;

    this.genBtnGroup();

    return <ButtonGroup btns={this.btnGroup} style={{marginTop: 35}} />;
  };

  // 渲染备案密码
  renderPassword = () => {
    if (this.name === 'RevokeHostDetail' ||
      this.name === 'RevokeSiteDetail' ||
      this.name === 'RevokeAccessResolve' ||
      this.name === 'RevokeAccessReject') {
      const {host} = this.state;
      const filingPassword = host['host.filingPassword'] || '';
      return (
        <Card title='备案密码' style={{marginTop: 50}} classID='password'>
          <Info label='备案密码' content={filingPassword} />
        </Card>
      );
    }

    return null;
  };

  // 渲染网站幕布照片
  renderCurtain = (site) => {
    if (this.name !== 'AuditDetail' && this.name !== 'AuditReject') return null;

    const {checkMode} = this.state;
    const props = {
      key: 'siteManager.photoPath',
      shadeText: '幕布照片',
      width: 337,
      height: 211,
      checkMode
    };
    props.src = site[props.key] || '';

    return (
      <div>
        <h5 style={{lineHeight: '34px'}}>幕布照片</h5>
        <PhotoFrame {...props} />
      </div>
    );
  };

  // 生成主体或网站的信息列表
  genInfoList = (INFO_LIST, data) => {
    let result = [];
    INFO_LIST.forEach(info => {
      const {key, label, parser} = info;
      const id = data['site.id'] || '';

      if (parser) {
        const list = parser(key, label, data, {id});
        result = result.concat(list);
      } else {
        info.other = {id};
        info.content = data[key] || '';
        result.push(info);
      }
    });

    return result;
  };

  // 渲染卡片信息列表
  renderCardInfo = (params) => {
    const {data, id, title, photos, infoList, style, photoClassName} = params;
    const list = [];

    data.forEach((d, i) => {
      const props = {
        key: i,
        title: this.renderTitle(d, title),
        style,
        suffix: this.renderPhoto(photos, d, photoClassName)
      };
      if (i === 0 && id) props.classID = id;

      list.push(
        <Card {...props}>
          {this.renderInfoList(this.genInfoList(infoList, d))}
          {id === 'website' ? this.renderCurtain(d) : null}
        </Card>
      );
    });

    return list;
  };

  // 设置主体或网站标题
  renderTitle = (data, _default) => {
    const suffix = data['host.hostUnitName'] || data['site.name'] || '';
    if (suffix.length === 0) return _default;
    return `${_default} - ${suffix}`;
  };

  // 渲染图片
  renderPhoto = (photos, data, className) => {
    let {checkMode} = this.state;
    const list = [];

    photos.forEach(d => {
      const {shadeText, key, height, width, nonCheck} = d;
      if (nonCheck) checkMode = false;
      const props = {
        shadeText,
        height,
        width,
        checkMode,
        onChange: this.checkInfoItem(key, data['site.id'] || ''),
        src: data[key] || ''
      };
      list.push(<li key={key}><PhotoFrame {...props} /></li>);
    });

    return <ul className={className || styles.photoFrame}>{list}</ul>;
  };

  // 渲染主体与网站信息列表项
  renderInfoList = (INFO_LIST) => {
    let {checkMode} = this.state;
    if (this.name === 'VerifyDetail') checkMode = false;
    const list = [];

    INFO_LIST.forEach(info => {
      const {key, label, content, other} = info;
      const {id, photoKey} = other;
      const props = {key, label, checkMode};
      props.onChange = this.checkInfoItem(key, id);
      props.content = typeof content === 'function' ? content(checkMode, this.checkInfoItem(photoKey, id)) : content;
      list.push(<Info {...props} />);
    });

    return list;
  };

  // 选择信息项
  checkInfoItem = (key, id) => {
    const isHost = key.substring(0, 4) === 'host';
    return (isChecked) => {
      if (!isHost && !this.site.hasOwnProperty(id)) this.site[id] = [];
      this.handleInfoItem(isChecked, key, isHost ? this.host : this.site[id]);
    };
  };

  // 处理错误项
  handleInfoItem = (isChecked, key, items) => {
    if (isChecked) {
      items.push(key);
    } else {
      const index = items.findIndex(i => i === key);
      items.splice(index, 1);
    }
  };

  // 渲染页面
  render() {
    const {host, sites} = this.state;
    const hostInfo = {
      data: [host],
      id: 'host',
      title: '主体信息',
      style: {marginTop: 20},
      photos: HOST_PHOTOS,
      infoList: HOST_INFO_LIST
    };
    const siteInfo = {
      data: sites,
      id: 'website',
      title: '网站信息',
      style: {marginTop: 50},
      photos: WEBSITE_PHOTOS,
      infoList: WEBSITE_INFO_LIST
    };

    return (
      <div className={styles.recordTrailDetail}>
        <Breadcrumb routes={this.route} style={{marginTop: 15}} />
        <MainHeader title='查看备案信息' style={{paddingTop: 5}} />
        <Anchor items={this.anchor} style={{marginTop: 30}} />
        <div style={{width: 500}}>
          {this.renderCardInfo(hostInfo)}
          {this.renderCardInfo(siteInfo)}
          {this.renderPassword()}
        </div>
        {this.renderTextarea()}
        {this.renderButtons()}
      </div>
    );
  }
}

export default TrialDetail;
