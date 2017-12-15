const {assert} = require('egg-mock/bootstrap');
const VerifyModel = require('../../app/service/verifyModel');

describe('test/service/verifyModel.test.js', () => {
  describe('parse()', () => {
    it('parameter >>> normal', () => {
      const result = new VerifyModel();
      result.parse({}, [{}]);
      assert(result.sites.length === 1);

      const siteInfo = result.sites[0];
      assert(Object.keys(siteInfo).length === 9);
      Object.keys(siteInfo).forEach(k => {
        assert(siteInfo[k] === '');
      });

      result.parse({hostUnitFullDto: {
        hostUnitName: 'hostUnitName'
      }}, [{
        webSiteBasicInfoDto: {
          id: 'id'
        },
        listWebSiteManagerInfo: [{
          photoPath: 'photoPath'
        }]
      }]);
      const site = result.sites[0];
      Object.keys(site).forEach(k => {
        if (k === 'site.id') {
          assert(site[k] === 'id');
        } else if (k === 'photoPath') {
          assert(site[k] === 'photoPath');
        } else if (k === 'hostUnitName') {
          assert(site[k] === 'hostUnitName');
        } else {
          assert(siteInfo[k] === '');
        }
      });
    });
  });

  describe('parseMaterial()', () => {
    it('parameter >>> {}', () => {
      const result = new VerifyModel();
      result.parseMaterial({});
      assert.deepEqual(result.sites, [{}]);
    });

    it('parameter >>> normal', () => {
      const result = new VerifyModel();
      result.sites.length = 0;
      result.sites.push({'site.id': 'id'});
      result.parseMaterial({webSiteManagerMaterialList: [{
        id: 'id',
        webSiteManagerPhotoFrontPath: 'webSiteManagerPhotoFrontPath'
      }]});

      assert(result.sites.length === 1);
      const siteInfo = result.sites[0];
      assert(Object.keys(siteInfo).length === 2);
      Object.keys(siteInfo).forEach(k => {
        if (k === 'site.id') {
          assert(siteInfo[k] === 'id');
        } else {
          assert(siteInfo[k] === k);
        }
      });
    });
  });
});
