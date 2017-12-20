import styles from './index.scss';
import React from 'react';
import Modal from '../../components/Modal';

class ModalAlert extends React.Component {
  onClose = () => {
    const {onClose} = this.props;
    onClose && onClose();
  };

  onConfirm = () => {
    const {callback} = this.props;
    callback && callback();
  }

  render() {
    const {header, content} = this.props;
    const btnGroup = [
      {key: 'cancel', text: '再想想', type: 'default', onClick: this.onClose},
      {key: 'confirm', text: '确定', type: 'primary', onClick: this.onConfirm}
    ];

    return (
      <Modal type='alert' width={500} showState footer={btnGroup} onCloseClick={this.onClose}>
        <h2 className={styles.header}>{header}</h2>
        <div className={styles.content}>{content}</div>
      </Modal>
    );
  }
}

export default ModalAlert;
