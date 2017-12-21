const {assert} = require('egg-mock/bootstrap');
const AccModel = require('../../app/service/accModel');

describe('test/service/accModel.test.js', () => {
  describe('parse()', () => {
    it('parameter >>> undefined', () => {
      const accModel = new AccModel();
      const result = accModel.parse();
      assert(result.totalSize === 0);
      assert(result.elements.length === 0);
    });

    it('parameter >>> {}', () => {
      const accModel = new AccModel();
      const result = accModel.parse({});
      assert(result.totalSize === 0);
      assert(result.elements.length === 0);
    });

    it('parameter >>> normal', () => {
      const accModel = new AccModel();
      const mockData = {
        elements_total: 3,
        elements: [{
          verify: 'PENDING',
          verify_time: 1,
          ID_verify: 'NEED_VERIFY',
          email_active: 'NOT_ACTIVATED'
        }]
      };

      const VERIFY_STATUS = accModel.getVerifyStatus();
      const ID_STATUS = accModel.getIdStatus();
      const EMAIL_STATUS = accModel.getEmailStatus();
      const result = accModel.parse(mockData);
      assert(result.totalSize === mockData.elements_total);
      assert(result.elements.length === mockData.elements.length);
      const oneElm = result.elements[0];
      Object.keys(oneElm).forEach(k => {
        if (k === 'verifyName') {
          assert(oneElm[k] === VERIFY_STATUS[oneElm['verify']]);
        } else if (k === 'ID_verify') {
          assert(oneElm[k] === ID_STATUS['NEED_VERIFY']);
        } else if (k === 'email_active') {
          assert(oneElm[k] === EMAIL_STATUS['NOT_ACTIVATED']);
        } else if (k === 'verify_time') {
          assert(oneElm[k] === 1000);
        }
      });
    });
  });
});
