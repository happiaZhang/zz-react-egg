import styles from './index.scss';
import React from 'react';
import Button from '../../components/Button';
import Checkbox from '../../components/Checkbox';

class PhotoFrame extends React.Component {
  static defaultProps = {
    width: 158,
    height: 99,
    download: false,
    checkMode: false
  };

  render() {
    const {className, width, height, shadeText, download, checkMode} = this.props;
    const style = {width, height};
    const checkboxStyle = {
      position: 'absolute',
      top: 0,
      right: 0,
      display: 'inline-block'
    };
    return (
      <div className={`${styles.frameContainer} ${className}`} style={style}>
        <span className={styles.frameShade}>{shadeText}</span>
        {download ? <Button className={styles.frameDownload} text='下载' /> : ''}
        {checkMode ? <Checkbox style={checkboxStyle} /> : ''}
      </div>
    );
  }
}

export default PhotoFrame;
