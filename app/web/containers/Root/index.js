import styles from './index.scss';
import React from 'react';
import {Route, BrowserRouter} from 'react-router-dom';
import Header from '../Header';
import Menu from '../Menu';
import RecordTrail from '../RecordTrail';
import RecordTrailDetail from '../RecordTrailDetail';
import MailCurtain from '../MailCurtain';
import CheckPhoto from '../CheckPhoto';
import Authority from '../Authority';
import AuthorityDetail from '../AuthorityDetail';
import Loading from '../Loading';

const ROUTES = [
  {path: '/', text: '备案初审', component: RecordTrail, menu: true},
  {path: '/trail/detail/:id', component: RecordTrailDetail},
  {path: '/mail', text: '邮寄幕布', component: MailCurtain, menu: true},
  {path: '/check', text: '审核幕布照片', component: CheckPhoto, menu: true},
  {path: '/authority', text: '管局审核', component: Authority, menu: true},
  {path: '/authority/detail/:id', component: AuthorityDetail}
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
