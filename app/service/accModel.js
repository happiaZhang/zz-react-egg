class AccModel {
  constructor() {
    this.totalSize = 0;
    this.elements = [];
  }

  getVerifyStatus() {
    return {
      PENDING: '待审批',
      PASS: '审批通过',
      REJECT: '审批拒绝'
    };
  }

  getIdStatus() {
    return {
      'NEED_VERIFY': '未认证',
      'VERIFY_SUCCESS': '已认证'
    };
  }

  getEmailStatus() {
    return {
      'NOT_ACTIVATED': '未绑定',
      ACTIVATED: '已绑定'
    };
  }

  parse(data) {
    if (typeof data !== 'object') return this;
    const {elements_total: totalSize, elements} = data;
    if (!elements) return this;

    const VERIFY_STATUS = this.getVerifyStatus();
    const ID_STATUS = this.getIdStatus();
    const EMAIL_STATUS = this.getEmailStatus();
    this.totalSize = totalSize;
    elements.forEach(elm => {
      const {verify, verify_time: ts, ID_verify, email_active} = elm;
      elm.verifyName = VERIFY_STATUS[verify] || '';
      elm['verify_time'] = ts * 1000;
      elm['ID_verify'] = ID_STATUS[ID_verify] || '';
      elm['email_active'] = EMAIL_STATUS[email_active] || '';
      this.elements.push(elm);
    });
    return this;
  }
}

module.exports = AccModel;
