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
import Loading from '../Loading';
import validate from '../../utils/validate';

const prefix = validate.prefix();
const ROUTES = [
  {path: prefix + '/query', text: '备案查询', component: Query, menu: true},
  {path: prefix + '/trail', text: '备案初审', component: RecordTrail, menu: true},
  {path: prefix + '/trail/detail/:id', component: RecordTrailDetail},
  {path: prefix + '/mail', text: '邮寄幕布', component: MailCurtain, menu: true},
  {path: prefix + '/check', text: '审核幕布照片', component: CheckPhoto, menu: true},
  {path: prefix + '/check/detail/:id', component: CheckPhotoDetail},
  {path: prefix + '/authority', text: '管局审核', component: Authority, menu: true},
  {path: prefix + '/authority/detail/:id', component: AuthorityDetail}
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
      <BrowserRouter>
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
