const IcpModel = require('./icpModel');

class AuditModel {
  constructor() {
    this.host = {};
    this.sites = [{}];
  }

  parseHost(hostInfo) {
    if (typeof hostInfo !== 'object') return this;

    const HOST_MAPPING = {
      'hostUnitName': 'hostUnitFullDto.hostUnitName',
      'hostType': 'hostUnitFullDto.hostUnitBasicDto.hostType',
      'hostCredentialType': 'hostUnitFullDto.hostUnitBasicDto.credentialType',
      'hostCredentialNumber': 'hostUnitFullDto.hostUnitBasicDto.credentialNumber'
    };

    const icpModel = new IcpModel();
    Object.keys(HOST_MAPPING).forEach(key => {
      this.host[key] = icpModel.convert(hostInfo, HOST_MAPPING[key]);
    });

    return this;
  }

  parseSites(siteInfo) {
    if (!(siteInfo instanceof Array) || siteInfo.length === 0) return this;
    this.sites.length = 0;

    const SITE_MAPPING = {
      'siteId': 'webSiteBasicInfoDto.id',
      'siteName': 'webSiteBasicInfoDto.name',
      'siteVerifiedDomain': 'webSiteBasicInfoDto.verifiedDomain',
      'siteIndexUrl': 'webSiteBasicInfoDto.indexUrl'
    };

    const icpModel = new IcpModel();
    siteInfo.forEach(site => {
      const obj = {};

      Object.keys(SITE_MAPPING).forEach(key => {
        obj[key] = icpModel.convert(site, SITE_MAPPING[key]);
      });

      this.sites.push(obj);
    });

    return this;
  }
}

module.exports = AuditModel;
