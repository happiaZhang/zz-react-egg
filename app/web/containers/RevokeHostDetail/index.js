import styles from '../TrialDetail/index.scss';
import React from 'react';
import TrialDetail from '../TrialDetail';
import Button from '../../components/Button';
import message from '../../components/Message';
import apis from '../../utils/apis';

class RevokeHostDetail extends TrialDetail {
  constructor(props) {
    super(props);
    this.name = 'RevokeHostDetail';
    this.route = [{key: 'revokeHost', to: '/revoke/host', text: '注销主体'}];
    this.anchor = [
      {text: '主体信息', to: '#host'},
      {text: '网站信息', to: '#website'},
      {text: '查看备案密码', to: '#password'}
    ];
    this.btnGroup = [{key: 'commit', text: '提交至管局审核', onClick: this.onCommit, style: {width: 150}}];
  }

  onCommit = () => {
    const data = {
      checkPerson: 'zhangzheng',
      rejectReason: '',
      operId: this.getOperId(),
      filingStatus: 20002
    };

    const msg = {
      success: '提交管局审核成功',
      failure: '提交管局审核失败，请刷新重试'
    };

    if (this.name === 'RevokeSiteDetail') data.filingStatus = 30002;
    if (this.name === 'RevokeAccessReject' || this.name === 'RevokeAccessResolve') data.filingType = 2;
    if (this.name === 'RevokeAccessReject') {
      data.filingStatus = 40004;
      msg.success = '取消接入驳回成功';
      msg.success = '取消接入驳回失败，请刷新重试';
    }
    if (this.name === 'RevokeAccessResolve') {
      data.filingStatus = 40003;
      msg.success = '取消接入操作成功';
      msg.success = '取消接入操作失败，请刷新重试';
    }

    apis.setFilingStatus(data).then(() => {
      message.success(msg.success, 3, () => {
        const {history} = this.props;
        history.push(this.route[0].to);
      });
    }).catch(() => {
      message.error(msg.failure);
    });
  };

  renderButtons = () => {
    return (
      <div className={styles.toolBar}>
        {
          this.btnGroup.map(props => {
            return <Button {...props} />;
          })
        }
      </div>
    );
  };
}

export default RevokeHostDetail;
