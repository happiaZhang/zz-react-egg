import styles from '../TrialDetail/index.scss';
import React from 'react';
import TrialDetail from '../TrialDetail';
import Breadcrumb from '../../components/Breadcrumb';
import MainHeader from '../MainHeader';
import Card from '../../components/Card';
import Info from '../../components/Info';
import Button from '../../components/Button';
import InputBox from '../../components/InputBox';
import message from '../../components/Message';
import apis from '../../utils/apis';
import validate from '../../utils/validate';

const ROUTES = [
  {key: 'audit', to: '/audit', text: '审核列表'}
];
const AUDIT_HOST = [
  {key: 'hostUnitFullDto.hostUnitName', label: '主办单位或主办人名称'},
  {key: 'hostUnitFullDto.hostUnitBasicDto.hostType', label: '主办单位性质'},
  {key: 'hostUnitFullDto.hostUnitBasicDto.credentialType', label: '主办单位证件类型'},
  {key: 'hostUnitFullDto.hostUnitBasicDto.credentialNumber', label: '主办单位证件号码'}
];
const AUDIT_SITE = [
  {key: 'webSiteBasicInfoDto.name', label: '网站名称'},
  {key: 'webSiteBasicInfoDto.indexUrl', label: '网站首页URL'},
  {key: 'webSiteBasicInfoDto.verifiedDomain', label: '已验证域名'}
];

class AuditDetail extends TrialDetail {
  constructor(props) {
    super(props);
    this.state = {
      hostInfo: null,
      listWebSiteInfo: null
    };
    this.filingHostNo = {};
    this.filingSiteNo = {};
  }

  componentDidMount() {
    const operId = this.getOperId();

    // 获取主体信息
    apis.getHostInfoByID({operId}).then(hostInfo => {
      this.setState({hostInfo});
    }).catch(() => {
      message.error('获取主体信息失败，请刷新重试');
    });

    // 获取网站信息
    apis.getWebsiteInfoByID({operId}).then(data => {
      const {listWebSiteInfo} = data;
      this.setState({listWebSiteInfo});
    }).catch(() => {
      message.error('获取网站信息失败，请刷新重试');
    });
  }

  onAudit = () => {
    const data = {
      checkPerson: 'zhangzheng',
      operId: this.getOperId()
    };

    Object.keys(this.filingHostNo).forEach(operId => {
      data.hostFilingNo = this.filingHostNo[operId];
    });

    const filingSiteNoDtoList = [];
    Object.keys(this.filingSiteNo).forEach(siteId => {
      filingSiteNoDtoList.push({
        siteFilingNo: this.filingSiteNo[siteId],
        siteId: parseInt(siteId)
      });
    });

    if (filingSiteNoDtoList.length > 0) data.filingSiteNoDtoList = filingSiteNoDtoList;

    apis.setFilingNo(data).then(() => {
      message.success('备案号保存成功', 2, () => {
        const {history} = this.props;
        history.push('/audit');
      });
    }).catch(() => {
      message.error('保存备案号失败，请刷新重试');
    });
  };

  renderButtons = () => {
    const btnGroup = [
      {key: 'confirm', text: '确定', onClick: this.onAudit}
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

  renderWebsiteInfo = () => {
    const {listWebSiteInfo} = this.state;
    const websiteList = [];
    listWebSiteInfo && listWebSiteInfo.forEach(website => {
      const siteId = validate.formatData(website, 'webSiteBasicInfoDto.id');
      const suffixProps = {
        label: '网站备案号',
        inputPlaceholder: '请输入网站备案号',
        onBlur: this.handleFilingNo(false, siteId)
      };
      const props = {
        key: siteId,
        title: '备案网站',
        style: {marginTop: 50},
        suffix: this.renderSuffix(suffixProps)
      };

      websiteList.push(
        <Card {...props}>
          {this.renderList(AUDIT_SITE, website)}
        </Card>
      );
    });

    return websiteList;
  };

  renderList = (infoList, data) => {
    const list = [];
    infoList.forEach((props) => {
      const {key} = props;
      const content = validate.formatData(data, key);
      list.push(<Info {...props} content={content} />);
    });
    return list;
  };

  handleFilingNo = (isHost, id) => {
    return (v) => {
      if (isHost) {
        this.filingHostNo[id] = v;
      } else {
        this.filingSiteNo[id] = v;
      }
    };
  }

  renderSuffix = (other = {}) => {
    const id = this.getOperId();
    const props = {
      label: '主体备案号',
      inputPlaceholder: '请输入主体备案号',
      style: {
        position: 'absolute',
        top: 0,
        left: '100%',
        marginLeft: 50
      },
      onBlur: this.handleFilingNo(true, id)
    };
    return <InputBox {...props} {...other} />;
  };

  render() {
    const {hostInfo} = this.state;
    return (
      <div className={styles.recordTrailDetail}>
        <Breadcrumb routes={ROUTES} style={{marginTop: 15}} />
        <MainHeader title='填写备案号' style={{paddingTop: 5}} />
        <div style={{width: 500}}>
          <Card title='备案主体' style={{marginTop: 20}} suffix={this.renderSuffix()}>
            {this.renderList(AUDIT_HOST, hostInfo)}
          </Card>
          {this.renderWebsiteInfo()}
        </div>
        {this.renderButtons()}
      </div>
    );
  }
}

export default AuditDetail;
