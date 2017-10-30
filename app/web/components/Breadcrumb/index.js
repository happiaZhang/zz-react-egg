import styles from './index.scss';
import React from 'react';
import {Link} from 'react-router-dom';

class Breadcrumb extends React.Component {
  static defaultProps = {
    routes: [],
    style: {}
  };

  shouldComponentUpdate() {
    return false;
  }

  // 页面渲染
  render() {
    const {routes, style} = this.props;
    if (routes.length === 0) return '';

    return (
      <div className={styles.breadcrumbContainer} style={style}>
        {
          routes.map(route => {
            const {key, to, text} = route;
            return (
              <span key={key} className={styles.breadcrumbItem}>
                <span className={styles.breadcrumbTitle}><Link to={to}>{text}</Link></span>
                <span className={styles.breadcrumbSeparator}>/</span>
              </span>
            );
          })
        }
      </div>
    );
  }
}

export default Breadcrumb;
