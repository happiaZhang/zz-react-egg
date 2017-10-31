import styles from '../RecordTrailDetail/index.scss';
import React from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import MainHeader from '../MainHeader';
import Card from '../../components/Card';
import Info from '../../components/Info';
import PhotoFrame from '../../components/PhotoFrame';
import Button from '../../components/Button';
import Textarea from '../../components/Textarea';
import validate from '../../utils/validate';

const ROUTES = [
  {key: 'checkPhoto', to: '/check', text: '申请列表'}
];
const WEBSITE_INFO = [
  [
    {label: '备案性质', content: '个人备案'},
    {label: '企业名称', content: '万达云计算有限公司'},
    {label: '网站负责人姓名', content: '王大大'},
    {label: '证件类型', content: '身份证'},
    {label: '证件号码', content: '241082085025028000'}
  ], [
    {label: '备案性质', content: '个人备案'},
    {label: '企业名称', content: '万达云计算有限公司'},
    {label: '网站负责人姓名', content: '王大大'},
    {label: '证件类型', content: '身份证'},
    {label: '证件号码', content: '241082085025028000'}
  ]
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

  renderList = (data) => {
    const list = [];
    data.forEach((props, i) => {
      list.push(<Info {...props} key={i} />);
    });
    return list;
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
      {key: 'cancel', text: '取消', type: 'default'},
      {key: 'confirm', text: '确认驳回'}
    ] : [
      {key: 'reject', text: '审核驳回', type: 'default'},
      {key: 'resolve', text: '审核通过'}
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

  renderSuffix = () => {
    const frames = [];
    WEBSITE_FRAMES.forEach((props, i) => {
      frames.push(<li key={i}><PhotoFrame {...props} /></li>);
    });
    return <ul className={styles.curtainFrame}>{frames}</ul>;
  };

  renderWebsiteInfo = () => {
    const websiteInfoList = [];
    WEBSITE_INFO.forEach((websiteInfo, i) => {
      const props = {
        key: i,
        title: '备案网站',
        style: {marginTop: 50},
        suffix: this.renderSuffix()
      };

      websiteInfoList.push(
        <Card {...props}>
          {this.renderList(websiteInfo)}
        </Card>
      );
    });

    return websiteInfoList;
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

export default CheckPhotoDetail;
