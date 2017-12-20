import RevokeHostDetail from '../RevokeHostDetail';

class RevokeAccessReject extends RevokeHostDetail {
  constructor(props) {
    super(props);
    this.name = 'RevokeAccessReject';
    this.route = [{key: 'revokeAccess', to: '/revoke/access', text: '取消接入'}];
  }

  // overwrite
  genBtnGroup = () => {
    this.btnGroup = [{key: 'commit', text: '审核驳回', onClick: this.onCommit}];
  };
}

export default RevokeAccessReject;
