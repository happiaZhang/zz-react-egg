import styles from './index.scss';
import React from 'react';
import Button from '../Button';

class Modal extends React.Component {
  static defaultProps = {
    title: '填写快递单号',
    showState: false
  };
  // 关闭点击处理
  handleCloseClick = () => {
    const {onCloseClick} = this.props;

    onCloseClick && onCloseClick();
  };

  // 取消点击处理
  handleCancelClick = () => {
    let {onCancelClick} = this.props;

    onCancelClick && onCancelClick();
  };

  // 确认点击处理
  handleSubmitClick = () => {
    let {onSubmitClick} = this.props;

    onSubmitClick && onSubmitClick();
  };

  // 页面渲染
  render() {
    let {title, children, showState} = this.props;
    if (!showState) return null;

    return (
      <div className={styles.modalWrap}>
        <div className={styles.modalContainer}>
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
              onClick={this.handleCancelClick} />
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
