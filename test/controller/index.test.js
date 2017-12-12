const {app, mock} = require('egg-mock/bootstrap');

describe('test/controller/index.test.js', () => {
  describe('GET /', () => {
    it('should status 200 and get the body', async () => {
      await app.httpRequest()
        .get('/')
        .expect(200)
        .expect(/<title>备案后台<\/title>/);
    });
  });
});
