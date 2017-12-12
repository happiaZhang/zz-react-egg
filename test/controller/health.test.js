const {app, mock} = require('egg-mock/bootstrap');

describe('test/controller/health.test.js', () => {
  describe('GET /liveness', () => {
    it('should status 200 and get the body', async () => {
      await app.httpRequest()
        .get('/liveness')
        .expect(200, 'success');
    });
  });

  describe('GET /readiness', () => {
    it('should status 200 and get the body', async () => {
      mock(app.redis, 'get', () => {
        return 'success';
      });

      await app.httpRequest()
        .get('/readiness')
        .expect(200, 'success');
    });
  });
});
