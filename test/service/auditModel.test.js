const {assert} = require('egg-mock/bootstrap');
const AuditModel = require('../../app/service/auditModel');

describe('test/service/auditModel.test.js', () => {
  describe('parseHost()', () => {
    it('parameter >>> undefined', () => {
      const auditModel = new AuditModel();
      const hostInfo = auditModel.parseHost(undefined);
      assert.deepEqual(hostInfo, {host: {}, sites: [{}]});
    });

    it('parameter >>> {}', () => {
      const auditModel = new AuditModel();
      const hostInfo = auditModel.parseHost({});
      assert(hostInfo.host);
      assert(Object.keys(hostInfo.host).length === 4);
      Object.keys(hostInfo.host).forEach(k => {
        assert(hostInfo.host[k] === '');
      });
    });

    it('parameter >>> normal', () => {
      const auditModel = new AuditModel();
      const hostInfo = auditModel.parseHost({
        hostUnitFullDto: {
          hostUnitName: 'hostUnitName',
          hostUnitBasicDto: {
            hostType: 'hostType',
            credentialType: 'credentialType',
            credentialNumber: 'credentialNumber'
          }
        }
      });
      assert.deepEqual(hostInfo, {
        host: {
          hostUnitName: 'hostUnitName',
          hostType: 'hostType',
          hostCredentialType: 'credentialType',
          hostCredentialNumber: 'credentialNumber'
        },
        sites: [{}]
      });
    });
  });

  describe('parseSites()', () => {
    it('parameter >>> []', () => {
      const auditModel = new AuditModel();
      const siteInfo = auditModel.parseSites([]);
      assert.deepEqual(siteInfo, {host: {}, sites: [{}]});
    });

    it('parameter >>> [{}]', () => {
      const auditModel = new AuditModel();
      const siteInfo = auditModel.parseSites([{}]);
      assert.deepEqual(siteInfo, {
        host: {},
        sites: [{
          siteId: '',
          siteName: '',
          siteVerifiedDomain: '',
          siteIndexUrl: ''
        }]
      });
    });

    it('parameter >>> normal', () => {
      const auditModel = new AuditModel();
      const siteInfo = auditModel.parseSites([{
        webSiteBasicInfoDto: {
          id: 'id',
          name: 'name',
          verifiedDomain: 'verifiedDomain',
          indexUrl: 'indexUrl'
        }
      }]);
      assert.deepEqual(siteInfo, {
        host: {},
        sites: [{
          siteId: 'id',
          siteName: 'name',
          siteVerifiedDomain: 'verifiedDomain',
          siteIndexUrl: 'indexUrl'
        }]
      });
    });
  });
});
