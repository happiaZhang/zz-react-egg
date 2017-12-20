const {app} = require('egg-mock/bootstrap');

describe('test/controller/index.test.js', () => {
  it('GET /icp', async() => {
    await app.httpRequest()
      .get('/icp')
      .expect(200)
      .expect(/<title>备案后台<\/title>/);
  });

  it('GET /icp/query', async() => {
    await app.httpRequest()
      .get('/icp/query')
      .expect(200)
      .expect(/<title>备案后台<\/title>/);
  });

  it('GET /icp/trial/detail/1', async() => {
    await app.httpRequest()
      .get('/icp/trial/detail/1')
      .expect(200)
      .expect(/<title>备案后台<\/title>/);
  });

  it('GET /acc', async() => {
    await app.httpRequest()
      .get('/acc')
      .expect(200)
      .expect(/<title>云用户后台<\/title>/);
  });

  it('GET /acc/detail/1', async() => {
    await app.httpRequest()
      .get('/acc/detail/1')
      .expect(200)
      .expect(/<title>云用户后台<\/title>/);
  });
});
