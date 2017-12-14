const {assert} = require('egg-mock/bootstrap');
const IcpModel = require('../../app/service/icpModel');
const hostInfoCount = 17;
const siteInfoCount = 16;

describe('test/service/icpModel.test.js', () => {
  describe('convert()', () => {
    it('parameter >>> {}', () => {
      const icpModel = new IcpModel();
      const result = icpModel.convert({}, '');
      assert(result === '');
    });

    it('parameter >>> null', () => {
      const icpModel = new IcpModel();
      const result = icpModel.convert({foo: null}, 'foo');
      assert(result === '');
    });

    it('parameter >>> normal', () => {
      const icpModel = new IcpModel();
      const result1 = icpModel.convert({fa: {fb: {fc: 'bar'}}}, 'fa.fb.fc');
      const result2 = icpModel.convert({fa: {fb: {fc: 'bar'}}}, 'fa.fb');
      const result3 = icpModel.convert({fa: {fb: {fc: 'bar'}, fd: null}}, 'fa.fb.fd');
      assert(result1 === 'bar');
      assert.deepEqual(result2, {fc: 'bar'});
      assert(result3 === '');
    });
  });

  describe('parseHost()', () => {
    it('parameter >>> undefined', () => {
      const icpModel = new IcpModel();
      icpModel.parseHost(undefined);
      assert.deepEqual(icpModel, {host: {}, sites: [{}]});
    });

    it('parameter >>> {}', () => {
      const icpModel = new IcpModel();
      icpModel.parseHost({});
      assert(icpModel.host);

      const hostInfo = icpModel.host;
      assert(Object.keys(hostInfo).length === hostInfoCount);
      Object.keys(hostInfo).forEach(k => {
        assert(hostInfo[k] === '');
      });
    });

    it('parameter >>> normal', () => {
      const icpModel = new IcpModel();
      icpModel.parseHost({
        hostUnitFullDto: {
          hostUnitName: 'hostUnitName',
          region: null
        },
        hostUnitManagerDto: {
          name: 'name',
          remark: null
        }
      });
      assert(icpModel.host);

      const hostInfo = icpModel.host;
      assert(Object.keys(hostInfo).length === hostInfoCount);
      Object.keys(hostInfo).forEach(k => {
        const result = hostInfo[k];
        if (k === 'host.hostUnitName' || k === 'hostManager.name') {
          assert(result === k.split('.')[1]);
        } else {
          assert(result === '');
        }
      });
    });
  });

  describe('parseSites()', () => {
    it('parameter >>> []', () => {
      const icpModel = new IcpModel();
      icpModel.parseSites([]);
      assert(icpModel.sites.length === 1);
    });

    it('parameter >>> [{}]', () => {
      const icpModel = new IcpModel();
      icpModel.parseSites([{}]);
      assert(icpModel.sites.length === 1);
      assert(Object.keys(icpModel.sites[0]).length === siteInfoCount);

      const siteInfo = icpModel.sites[0];
      Object.keys(siteInfo).forEach(k => {
        assert(siteInfo[k] === '');
      });
    });

    it('parameter >>> normal', () => {
      const icpModel = new IcpModel();
      icpModel.parseSites([{
        webSiteBasicInfoDto: {
          id: 'id',
          auditContent: JSON.stringify({value: 'v'})
        },
        listWebSiteManagerInfo: [{
          id: 'id'
        }]
      }, {
        webSiteBasicInfoDto: {
          id: 'id',
          auditContent: JSON.stringify({value: 'v', files: []})
        }
      }]);
      assert(icpModel.sites.length === 2);

      const siteInfo = icpModel.sites;
      siteInfo.forEach((site, i) => {
        const len = Object.keys(site).length;
        i === 0 ? assert(len === siteInfoCount) : assert(len === siteInfoCount + 1);

        Object.keys(site).forEach(k => {
          if (k === 'site.id') {
            assert(site[k] === 'id');
          } else if (k === 'siteManager.id') {
            i === 0 ? assert(site[k] === 'id') : assert(site[k] === '');
          } else if (k === 'site.auditContent') {
            assert(site[k] === 'v');
          } else if (k === 'site.auditFiles') {
            assert(site[k] === JSON.stringify([]));
          } else {
            assert(site[k] === '');
          }
        });
      });
    });
  });
});
