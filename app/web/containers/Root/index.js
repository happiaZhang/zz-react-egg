import styles from './index.scss';
import React from 'react';
import {Route, BrowserRouter} from 'react-router-dom';
import Header from '../Header';
import Menu from '../Menu';
import Query from '../Query';
import Trial from '../Trial';
import TrialDetail from '../TrialDetail';
import Modify from '../Modify';
import ModifyDetail from '../ModifyDetail';
import Delivery from '../Delivery';
import Verify from '../Verify';
import VerifyDetail from '../VerifyDetail';
import Audit from '../Audit';
import AuditResolve from '../AuditResolve';
import AuditReject from '../AuditReject';
import AuditDetail from '../AuditDetail';
import RevokeHost from '../RevokeHost';
import RevokeHostDetail from '../RevokeHostDetail';
import RevokeSite from '../RevokeSite';
import RevokeSiteDetail from '../RevokeSiteDetail';
import RevokeAccess from '../RevokeAccess';
import RevokeAccessResolve from '../RevokeAccessResolve';
import RevokeAccessReject from '../RevokeAccessReject';
import Loading from '../Loading';
import validate from '../../utils/validate';

const prefix = validate.prefix();
const ROUTES = [
  {path: '/', text: '备案查询', component: Query, menu: true},
  {path: '/trial', text: '备案初审', component: Trial, menu: true},
  {path: '/trial/detail/:id', component: TrialDetail},
  {path: '/modify', text: '变更备案', component: Modify, menu: true},
  {path: '/modify/detail/:id', component: ModifyDetail},
  {path: '/delivery', text: '邮寄幕布', component: Delivery, menu: true},
  {path: '/verify', text: '审核幕布照片', component: Verify, menu: true},
  {path: '/verify/detail/:id', component: VerifyDetail},
  {path: '/audit', text: '管局审核', component: Audit, menu: true},
  {path: '/audit/resolve/:id', component: AuditResolve},
  {path: '/audit/reject/:id', component: AuditReject},
  {path: '/audit/detail/:id', component: AuditDetail},
  {path: '/revoke/host', text: '注销主体', component: RevokeHost, menu: true},
  {path: '/revoke/host/:id', component: RevokeHostDetail},
  {path: '/revoke/site', text: '注销网站', component: RevokeSite, menu: true},
  {path: '/revoke/site/:id/:siteId', component: RevokeSiteDetail},
  {path: '/revoke/access', text: '取消接入', component: RevokeAccess, menu: true},
  {path: '/revoke/access/resolve/:id/:siteId', component: RevokeAccessResolve},
  {path: '/revoke/access/reject/:id/:siteId', component: RevokeAccessReject}
];

export default class Root extends React.Component {
  setMenu = () => {
    const menuList = [];
    ROUTES.forEach(route => {
      const {path, text, menu = false} = route;
      menu && menuList.push({
        text, link: path
      });
    });
    return menuList;
  };

  renderRoutes = () => {
    const routes = [];
    ROUTES.forEach(props => {
      const {path} = props;
      routes.push(<Route key={path} exact {...props} />);
    });
    return routes;
  };

  render() {
    return (
      <BrowserRouter basename={prefix}>
        <div className={styles.wrapper}>
          <Loading />
          <Header />
          <div className={styles.content}>
            <Menu links={this.setMenu()} />
            <div className={styles.mainContent}>
              {this.renderRoutes()}
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
