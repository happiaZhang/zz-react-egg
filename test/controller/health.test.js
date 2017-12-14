const {app, mock} = require('egg-mock/bootstrap');

describe('test/controller/health.test.js', () => {
  it('GET /liveness', async() => {
    await app.httpRequest()
      .get('/liveness')
      .expect(200, 'success');
  });

  it('GET /readiness', async() => {
    mock(app.redis, 'get', () => {
      return 'success';
    });

    await app.httpRequest()
      .get('/readiness')
      .expect(200, 'success');
  });
});
