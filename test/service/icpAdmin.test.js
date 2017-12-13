const {app, mock, assert} = require('egg-mock/bootstrap');

describe('test/service/icpAdmin.test.js', () => {
  describe('getAdminInfo()', () => {
    it('should with render success', async () => {
      const ctx = app.mockContext();
      const svc = ctx.service.icpAdmin;
      const data = {code: '0', data: {foo: 'bar'}}
      mock(svc, 'request', () => {
        return {
          status: 200,
          data
        }
      });

      const adminInfo = await svc.getAdminInfo();
      assert(adminInfo.code === 0);
      assert.deepEqual(adminInfo.data, data);
    });
  });
});
