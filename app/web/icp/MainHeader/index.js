import styles from './index.scss';
import React from 'react';
import {Link} from 'react-router-dom';

class MainHeader extends React.Component {
  static defaultProps = {
    title: '',
    backLink: {
      text: '',
      link: '#'
    }
  };

  shouldComponentUpdate() {
    return false;
  }

  // 页面渲染
  render() {
    let {title, backLink, style} = this.props;

    return (
      <div className={styles.content} style={style}>
        {backLink.link !== '#' &&
          <p className={styles.backLink}>
            <Link className={styles.link} to={backLink.link}>&lt; {backLink.text}</Link>
          </p>
        }
        <p className={styles.title}>{title}</p>
      </div>
    );
  }
}

export default MainHeader;
