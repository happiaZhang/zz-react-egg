const {assert} = require('egg-mock/bootstrap');
const RejectModel = require('../../app/service/rejectModel');

describe('test/service/rejectModel.test.js', () => {
  describe('isEmpty()', () => {
    it('parameter >>> []', () => {
      const rejectModel = new RejectModel();
      const result = rejectModel.isEmpty([]);
      assert(result === true);
    });

    it('parameter >>> {}', () => {
      const rejectModel = new RejectModel();
      const result = rejectModel.isEmpty({});
      assert(result === true);
    });
  });

  describe('obj2Arr()', () => {
    it('parameter >>> {k1: v1, k2: v2, k3: v3}', () => {
      const rejectModel = new RejectModel();
      const mockData = {
        k1: 'v1',
        k2: 'v2',
        k3: 'v3'
      };
      const result = rejectModel.obj2Arr(mockData, 'key', 'value');
      assert(result.length === 3);
      result.forEach(r => {
        const {key, value} = r;
        assert(mockData[key] === value);
      });
    });
  });

  describe('parseHost()', () => {
    it('parameter >>> normal', () => {
      const rejectModel = new RejectModel();
      rejectModel.parseHost(['host.hostBusinessLicensePhotoPath']);
      assert(rejectModel.hostManagerItems.length === 1);

      assert(rejectModel.isEmpty(rejectModel.hostInfo) === true);

      assert(rejectModel.hostUnit.length === 0);
      rejectModel.parseHost(['host.id']);
      assert(rejectModel.hostUnit.length === 1);

      assert(rejectModel.hostUnitManager.length === 0);
      rejectModel.parseHost(['hostManager.id']);
      assert(rejectModel.hostUnitManager.length === 1);

      Object.keys(rejectModel.hostInfo).forEach(k => {
        assert(rejectModel.hostInfo[k].length === 1);
      });
    });
  });

  describe('parseSite()', () => {
    it('parameter >>> normal', () => {
      const result = new RejectModel();
      result.parseSite([
        'site.name',
        'site.verifiedDomain_a.com',
        'site.verifiedDomain_b.com',
        'site.auditFiles_news|approvalNumber',
        'siteManager.name',
        'site.webSiteFilingVerifyPhotoPath'
      ], 1);

      assert(result.websiteInfo.length === 1);
      const {id, auditContent, verifiedDomain, otherItems} = result.websiteInfo[0];
      assert(id === 1);
      assert(auditContent.length === 1);
      assert.deepEqual(auditContent, [{key: 'news', items: ['approvalNumber']}]);
      assert.deepEqual(verifiedDomain, ['a.com', 'b.com']);
      assert.deepEqual(otherItems, ['name']);

      assert(result.websiteManagerInfo.length === 1);
      const {id: siteId, warnItems} = result.websiteManagerInfo[0];
      assert(siteId === 1);
      assert.deepEqual(warnItems, ['name']);

      assert(result.webSitePhotoItems.length === 1);
      const {id: sid, warnItems: mItems} = result.webSitePhotoItems[0];
      assert(sid === 1);
      assert.deepEqual(mItems, ['webSiteFilingVerifyPhotoPath']);
    });
  });
});
