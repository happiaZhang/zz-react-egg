const {app} = require('egg-mock/bootstrap');
const data = {foo: 'bar'}; // response body

describe('test/service/accAdmin.test.js', () => {
  it('getUserVerifyRecord()', async() => {
    app.mockHttpclient(`${app.config.accAdminHost}/QueryUserVerifyRecord`, {
      data: JSON.stringify(data)
    });

    await app.httpRequest()
      .get('/api/acc-admin/getUserVerifyRecord')
      .expect(200);
  });

  it('setUserVerifyRecord()', async() => {
    app.mockHttpclient(`${app.config.accAdminHost}/ModifyUserVerifyRecord`, {
      data: JSON.stringify(data)
    });

    await app.httpRequest()
      .get('/api/acc-admin/setUserVerifyRecord')
      .expect(200);
  });
});
