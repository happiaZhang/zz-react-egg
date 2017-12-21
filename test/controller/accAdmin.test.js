const {app, assert} = require('egg-mock/bootstrap');

describe('test/controller/accAdmin.test.js', () => {
  it('GET /api/acc-admin/getUserVerifyRecord', async() => {
    app.mockService('accAdmin', 'getUserVerifyRecord', params => {
      return params;
    });

    await app.httpRequest()
      .get('/api/acc-admin/getUserVerifyRecord')
      .expect(200)
      .expect(res => {
        const {host, search, data} = res.body;
        assert(host === app.config.accAdminHost);
        assert(search === '');
        assert.deepEqual(data, {});
      });
  });

  it('POST /api/acc-admin/setUserVerifyRecord', async() => {
    app.mockService('accAdmin', 'setUserVerifyRecord', params => {
      return params;
    });

    app.mockCsrf();

    await app.httpRequest()
      .post('/api/acc-admin/setUserVerifyRecord')
      .send({foo: 'bar'})
      .expect(200)
      .expect(res => {
        const {host, search, data} = res.body;
        assert(host === app.config.accAdminHost);
        assert(search === '');
        assert.deepEqual(data, {foo: 'bar'});
      });
  });
});
