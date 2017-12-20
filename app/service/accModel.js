class AccModel {
  constructor() {
    this.totalSize = 0;
    this.elements = [];
  }

  parse(data) {
    if (typeof data !== 'object') return this;

    const {elements_total: totalSize, elements} = data;
    const VERIFY_STATUS = {
      PENDING: '待审批',
      PASS: '审批通过',
      REJECT: '审批拒绝'
    };
    const ID_STATUS = {
      'NEED_VERIFY': '未认证',
      'VERIFY_SUCCESS': '已认证'
    };
    const EMAIL_STATUS = {
      'NOT_ACTIVATED': '未绑定',
      ACTIVATED: '已绑定'
    };
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
