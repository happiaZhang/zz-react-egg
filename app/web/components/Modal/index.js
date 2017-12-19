import styles from './index.scss';
import React from 'react';
import ButtonGroup from '../ButtonGroup';

class Modal extends React.Component {
  static defaultProps = {
    type: 'modal',
    title: '填写快递单号',
    showState: false,
    width: 500,
    footer: [
      {key: 'cancel', text: '取消', type: 'default'},
      {key: 'confirm', text: '确定', type: 'primary'}
    ]
  };
  // 关闭点击处理
  handleCloseClick = () => {
    const {onCloseClick} = this.props;

    onCloseClick && onCloseClick();
  };

  // 页面渲染
  render() {
    const {type, title, children, showState, width, footer} = this.props;
    if (!showState) return null;

    const isAlert = type === 'alert';
    const style = {width};
    let classNames = styles.modalContainer;
    if (isAlert) classNames += ' ' + styles.alert;
    return (
      <div className={styles.modalWrap}>
        <div className={classNames} style={style}>
          <div className={styles.modalHeader}>
            {isAlert ? null : <h4>{title}</h4>}
            <a className={styles.iconClose} onClick={this.handleCloseClick}>&times;</a>
          </div>
          <div className={styles.modalContent}>{children}</div>
          <div className={styles.modalFooter}><ButtonGroup btns={footer} /></div>
        </div>
      </div>
    );
  }
}

export default Modal;
