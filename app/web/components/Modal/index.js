import styles from './index.scss';
import React from 'react';
import Button from '../Button';

class Modal extends React.Component {
  static defaultProps = {
    title: '填写快递单号',
    showState: false,
    width: 500
  };
  // 关闭点击处理
  handleCloseClick = () => {
    const {onCloseClick} = this.props;

    onCloseClick && onCloseClick();
  };

  // 确认点击处理
  handleSubmitClick = () => {
    let {onSubmitClick} = this.props;

    onSubmitClick && onSubmitClick();
  };

  // 页面渲染
  render() {
    let {title, children, showState, width} = this.props;
    if (!showState) return null;
    const style = {width};

    return (
      <div className={styles.modalWrap}>
        <div className={styles.modalContainer} style={style}>
          <div className={styles.modalHeader}>
            <h4>{title}</h4>
            <a className={styles.iconClose} onClick={this.handleCloseClick}>&times;</a>
          </div>
          <div className={styles.modalContent}>{children}</div>
          <div className={styles.modalFooter}>
            <Button
              text={'取消'}
              type={'default'}
              style={{width: 80, height: 36}}
              onClick={this.handleCloseClick} />
            <Button
              text={'确定'}
              type={'primary'}
              style={{marginLeft: 20, width: 80, height: 36}}
              onClick={this.handleSubmitClick} />
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
