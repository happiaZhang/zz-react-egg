const {app} = require('egg-mock/bootstrap');

describe('test/controller/icpAdmin.test.js', () => {
  describe('GET /api/icp-admin/getAdminInfo', () => {
    it('should status 200 and get the body', async () => {
      app.mockService('icpAdmin', 'getAdminInfo', () => {
        return {code: 0, msg: null, data: 'ok'};
      });

      await app.httpRequest()
        .get('/api/icp-admin/getAdminInfo')
        .expect(200, {code: 0, msg: null, data: 'ok'});
    });
  });
});
