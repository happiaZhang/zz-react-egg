import styles from './index.scss';
import React from 'react';
import {Route, BrowserRouter} from 'react-router-dom';
import Menu from '../../icp/Menu';
import Loading from '../../icp/Loading';
import ModalContainer from '../../icp/ModalContainer';
import AccVerify from '../AccVerify';
import AccVerifyDetail from '../AccVerifyDetail';
import {initScrElm} from '../../utils/scroller';

const ROUTES = [
  {path: '/', text: '内测用户审核', component: AccVerify, menu: true},
  {path: '/detail/:id', component: AccVerifyDetail}
];

class Root extends React.Component {
  setMenu = () => {
    const menuList = [];
    ROUTES.forEach(route => {
      const {path, text, menu = false} = route;
      menu && menuList.push({text, path});
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

  getActiveLink = () => {
    const {pathname} = this.props.location;
    if (pathname.length === 1) return pathname;

    let activeLink = null;
    ROUTES.forEach(rt => {
      const {path, menu} = rt;
      if (menu && pathname.indexOf(path) > -1) activeLink = path;
    });
    return activeLink;
  };

  componentDidMount() {
    initScrElm(this.scrElm);
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <Loading />
        <div className={styles.content}>
          <Menu links={this.setMenu()} activeLink={this.getActiveLink()} />
          <div ref={ref => (this.scrElm = ref)} className={styles.mainContent}>
            {this.renderRoutes()}
          </div>
        </div>
        <ModalContainer />
      </div>
    );
  }
}

const Routes = (
  <BrowserRouter basename={'/icp/acc'}>
    <Route path='/' component={Root} />
  </BrowserRouter>
);

export default Routes;
