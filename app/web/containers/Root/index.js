import styles from './index.scss';
import React from 'react';
import {Route, BrowserRouter} from 'react-router-dom';
import Header from '../Header';
import Menu from '../Menu';
import Query from '../Query';
import RecordTrail from '../RecordTrail';
import RecordTrailDetail from '../RecordTrailDetail';
import MailCurtain from '../MailCurtain';
import CheckPhoto from '../CheckPhoto';
import CheckPhotoDetail from '../CheckPhotoDetail';
import Authority from '../Authority';
import AuthorityDetail from '../AuthorityDetail';
import HostRevoke from '../HostRevoke';
import SiteRevoke from '../SiteRevoke';
import AccessRevoke from '../AccessRevoke';
import Loading from '../Loading';
import validate from '../../utils/validate';

const prefix = validate.prefix();
const ROUTES = [
  {path: '/', text: '备案查询', component: Query, menu: true},
  {path: '/trail', text: '备案初审', component: RecordTrail, menu: true},
  {path: '/trail/detail/:id', component: RecordTrailDetail},
  {path: '/mail', text: '邮寄幕布', component: MailCurtain, menu: true},
  {path: '/check', text: '审核幕布照片', component: CheckPhoto, menu: true},
  {path: '/check/detail/:id', component: CheckPhotoDetail},
  {path: '/authority', text: '管局审核', component: Authority, menu: true},
  {path: '/authority/detail/:id', component: AuthorityDetail},
  {path: '/revoke/host', text: '注销主体', component: HostRevoke, menu: true},
  {path: '/revoke/site', text: '注销网站', component: SiteRevoke, menu: true},
  {path: '/revoke/access', text: '取消接入', component: AccessRevoke, menu: true}
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
