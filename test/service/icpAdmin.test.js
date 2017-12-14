const {app} = require('egg-mock/bootstrap');
const data = {foo: 'bar'}; // response body

describe('test/service/icpAdmin.test.js', () => {
  it('getAdminInfo()', async() => {
    app.mockHttpclient(`${app.config.adminHost}/userrest/view?token=`, {
      data: JSON.stringify(data)
    });

    await app.httpRequest()
      .get('/api/icp-admin/getAdminInfo')
      .expect(200);
  });

  it('getAllWebsiteInfo()', async() => {
    app.mockHttpclient(`${app.config.icpAdminHost}/filing-admin/all-website-info`, {
      data: JSON.stringify(data)
    });

    await app.httpRequest()
      .get('/api/icp-admin/getAllWebsiteInfo')
      .expect(200);
  });

  it('setCurtainDeliveryInfo()', async() => {
    app.mockHttpclient(`${app.config.icpAdminHost}/filing-admin/curtain-delivery-info`, {
      data: JSON.stringify(data)
    });

    await app.httpRequest()
      .get('/api/icp-admin/setCurtainDeliveryInfo')
      .expect(200);
  });

  it('getCurtainInfo()', async() => {
    app.mockHttpclient(`${app.config.icpAdminHost}/filing-admin/curtain-info`, {
      data: JSON.stringify(data)
    });

    await app.httpRequest()
      .get('/api/icp-admin/getCurtainInfo')
      .expect(200);
  });

  it('setFilingNo()', async() => {
    app.mockHttpclient(`${app.config.icpAdminHost}/filing-admin/filing-no`, {
      data: JSON.stringify(data)
    });

    await app.httpRequest()
      .get('/api/icp-admin/setFilingNo')
      .expect(200);
  });

  it('setFilingStatus()', async() => {
    app.mockHttpclient(`${app.config.icpAdminHost}/filing-admin/filing-status`, {
      data: JSON.stringify(data)
    });

    await app.httpRequest()
      .get('/api/icp-admin/setFilingStatus')
      .expect(200);
  });

  it('getHostInfo()', async() => {
    app.mockHttpclient(`${app.config.icpAdminHost}/filing-admin/host-info`, {
      data: JSON.stringify(data)
    });

    await app.httpRequest()
      .get('/api/icp-admin/getHostInfo')
      .expect(200);
  });

  it('getHostInfoMaterial()', async() => {
    app.mockHttpclient(`${app.config.icpAdminHost}/filing-admin/host-info-material`, {
      data: JSON.stringify(data)
    });

    await app.httpRequest()
      .get('/api/icp-admin/getHostInfoMaterial')
      .expect(200);
  });

  it('getHostRevokeInfo()', async() => {
    app.mockHttpclient(`${app.config.icpAdminHost}/filing-admin/host-revoke-info`, {
      data: JSON.stringify(data)
    });

    await app.httpRequest()
      .get('/api/icp-admin/getHostRevokeInfo')
      .expect(200);
  });

  it('getInfoSummaryNonRevoked()', async() => {
    app.mockHttpclient(`${app.config.icpAdminHost}/filing-admin/info-summary-non-revoked`, {
      data: JSON.stringify(data)
    });

    await app.httpRequest()
      .get('/api/icp-admin/getInfoSummaryNonRevoked')
      .expect(200);
  });

  it('getInfoSummaryRevoked()', async() => {
    app.mockHttpclient(`${app.config.icpAdminHost}/filing-admin/info-summary-revoked`, {
      data: JSON.stringify(data)
    });

    await app.httpRequest()
      .get('/api/icp-admin/getInfoSummaryRevoked')
      .expect(200);
  });

  it('getSiteAccesscancelledInfo()', async() => {
    app.mockHttpclient(`${app.config.icpAdminHost}/filing-admin/site-accesscancelled-info`, {
      data: JSON.stringify(data)
    });

    await app.httpRequest()
      .get('/api/icp-admin/getSiteAccesscancelledInfo')
      .expect(200);
  });

  it('getSiteRevokeInfo()', async() => {
    app.mockHttpclient(`${app.config.icpAdminHost}/filing-admin/site-revoke-info`, {
      data: JSON.stringify(data)
    });

    await app.httpRequest()
      .get('/api/icp-admin/getSiteRevokeInfo')
      .expect(200);
  });
});
