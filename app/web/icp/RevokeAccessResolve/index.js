import RevokeHostDetail from '../RevokeHostDetail';

class RevokeAccessResolve extends RevokeHostDetail {
  constructor(props) {
    super(props);
    this.name = 'RevokeAccessResolve';
    this.route = [{key: 'revokeAccess', to: '/revoke/access', text: '取消接入'}];
  }

  // overwrite
  genBtnGroup = () => {
    this.btnGroup = [{key: 'commit', text: '审核通过', onClick: this.onCommit}];
  };
}

export default RevokeAccessResolve;
