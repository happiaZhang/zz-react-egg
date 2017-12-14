const {app} = require('egg-mock/bootstrap');

describe('test/controller/index.test.js', () => {
  it('GET /*', async() => {
    await app.httpRequest()
      .get('/*')
      .expect(200)
      .expect(/<title>备案后台<\/title>/);
  });
});
