import styles from '../TrialDetail/index.scss';
import React from 'react';
import TrialDetail from '../TrialDetail';
import Button from '../../components/Button';
import message from '../../components/Message';
import apis from '../../utils/apis';

class RevokeHostDetail extends TrialDetail {
  constructor(props) {
    super(props);
    this.route = [{key: 'revokeHost', to: '/revoke/host', text: '注销主体'}];
    this.anchor = [
      {text: '主体信息', to: '#host'},
      {text: '网站信息', to: '#website'},
      {text: '查看备案密码', to: '#password'}
    ];
    this.type = 'RevokeHostDetail';
  }

  onCommit = () => {
    const data = {
      checkPerson: 'zhangzheng',
      operId: this.getOperId(),
      status: 20002
    };
    apis.setHostRevoke(data).then(() => {
      message.success('提交管局审核成功', 3, () => {
        const {history} = this.props;
        history.push('/revoke/host');
      });
    }).catch(() => {
      message.error('提交管局审核失败，请刷新重试');
    });
  };

  renderButtons = () => {
    const btnGroup = [
      {key: 'commit', text: '已提交管局审核', onClick: this.onCommit, style: {width: 150}}
    ];
    return (
      <div className={styles.toolBar}>
        {
          btnGroup.map(props => {
            return <Button {...props} />;
          })
        }
      </div>
    );
  };
}

export default RevokeHostDetail;
