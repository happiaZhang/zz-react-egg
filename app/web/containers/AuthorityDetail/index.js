import styles from '../RecordTrailDetail/index.scss';
import React from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import MainHeader from '../MainHeader';
import Card from '../../components/Card';
import Info from '../../components/Info';
import Button from '../../components/Button';
import InputBox from '../../components/InputBox';
import validate from '../../utils/validate';

const ROUTES = [
  {key: 'authorityList', to: '/authority', text: '审核列表'}
];
const RECORD_HOST = [
  {label: '主办单位或主办人名称', content: '万达云计算有限公司'},
  {label: '主办单位性质', content: '企业'},
  {label: '主办单位证件类型', content: '工商营业执照'},
  {label: '主办单位证件号码', content: '3250280852096-3'}
];
const RECORD_WEBSITE = [
  [
    {label: '网站名称', content: '万达云'},
    {label: '网站首页URL', content: 'www.wanda.cn'},
    {label: '已验证域名', content: 'wanda.cn'}
  ], [
    {label: '网站名称', content: '飞凡'},
    {label: '网站首页URL', content: 'www.wanda.cn'},
    {label: '已验证域名', content: 'wanda.cn'}
  ]
];

class AuthorityDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkMode: false,
      hostInfo: null,
      listWebSiteInfo: null
    };
  }

  componentDidMount() {
  }

  shouldComponentUpdate(nextProps, nextState) {
    const stateKey = Object.keys(nextState).find(k => nextState[k] !== this.state[k]);
    return !validate.isNil(stateKey);
  }

  onConfirm = (v) => {
    console.log(v);
  };

  renderButtons = () => {
    const btnGroup = [
      {key: 'confirm', text: '确定', onClick: this.onConfirm}
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
    const websiteList = [];
    RECORD_WEBSITE.forEach((website, i) => {
      const props = {
        key: i,
        title: '备案网站',
        style: {marginTop: 50},
        suffix: this.renderSuffix({label: '网站备案号', inputPlaceholder: '请输入网站备案号'})
      };

      websiteList.push(
        <Card {...props}>
          {this.renderList(website)}
        </Card>
      );
    });

    return websiteList;
  };

  renderList = (data) => {
    const list = [];
    data.forEach((props, i) => {
      list.push(<Info {...props} key={i} />);
    });
    return list;
  };

  renderSuffix = (other = {}) => {
    const props = {
      label: '主体备案号',
      inputPlaceholder: '请输入主体备案号',
      style: {
        position: 'absolute',
        top: 0,
        left: '100%',
        marginLeft: 50
      }
    };
    return <InputBox {...props} {...other} />;
  };

  render() {
    return (
      <div className={styles.recordTrailDetail}>
        <Breadcrumb routes={ROUTES} style={{marginTop: 15}} />
        <MainHeader title='填写备案号' style={{paddingTop: 5}} />
        <div style={{width: 500}}>
          <Card title='备案主体' style={{marginTop: 20}} suffix={this.renderSuffix()}>
            {this.renderList(RECORD_HOST)}
          </Card>
          {this.renderWebsiteInfo()}
        </div>
        {this.renderButtons()}
      </div>
    );
  }
}

export default AuthorityDetail;
