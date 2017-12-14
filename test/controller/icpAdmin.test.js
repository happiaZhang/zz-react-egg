const {app, assert} = require('egg-mock/bootstrap');

describe('test/controller/icpAdmin.test.js', () => {
  it('GET /api/icp-admin/getAdminInfo', async () => {
    app.mockService('icpAdmin', 'getAdminInfo', (params) => {
      return params;
    });

    await app.httpRequest()
      .get('/api/icp-admin/getAdminInfo')
      .expect(200)
      .expect(res => {
        const {host, search, data} = res.body;
        assert(host === app.config.adminHost);
        assert(search === '?token=');
        assert.deepEqual(data, {});
      });
  });

  it('GET /api/icp-admin/getTrialInfo', async () => {
    app.mockService('icpAdmin', 'getTrialInfo', (params) => {
      return params;
    });

    await app.httpRequest()
      .get('/api/icp-admin/getTrialInfo?foo=bar')
      .expect(200)
      .expect(res => {
        const {host, search, data} = res.body;
        assert(host === app.config.icpAdminHost);
        assert(search === '?foo=bar');
        assert.deepEqual(data, {});
      });
  });

  it('POST /api/icp-admin/setTrailStatus', async () => {
    app.mockService('icpAdmin', 'setTrailStatus', (params) => {
      return params;
    });

    app.mockCsrf();

    await app.httpRequest()
      .post('/api/icp-admin/setTrailStatus')
      .send({foo: 'bar'})
      .expect(200)
      .expect(res => {
        const {host, search, data} = res.body;
        assert(host === app.config.icpAdminHost);
        assert(search === '');
        assert.deepEqual(data, {foo: 'bar'});
      });
  });
});
