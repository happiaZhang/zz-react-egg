const IcpModel = require('./icpModel');

class VerifyModel {
  constructor() {
    this.sites = [{}];
  }

  parse(hostInfo, siteInfo) {
    const HOST_MAPPING = {
      hostType: 'hostUnitFullDto.hostUnitBasicDto.hostType',
      hostUnitName: 'hostUnitFullDto.hostUnitName'
    };

    const SITE_MAPPING = {
      'site.id': 'webSiteBasicInfoDto.id',
      'site.name': 'webSiteBasicInfoDto.name',
      siteManagerId: 'webSiteManagerInfo.id',
      siteManagerName: 'webSiteManagerInfo.name',
      siteManagerCredentialType: 'webSiteManagerInfo.credentialType',
      siteManagerCredentialNumber: 'webSiteManagerInfo.credentialNumber',
      photoPath: 'webSiteManagerInfo.photoPath'
    };

    if (!(siteInfo instanceof Array) || siteInfo.length === 0) return this;
    this.sites.length = 0;
    const icpModel = new IcpModel();

    siteInfo.forEach(site => {
      const {listWebSiteManagerInfo} = site;
      if (listWebSiteManagerInfo.length > 0) site.webSiteManagerInfo = listWebSiteManagerInfo[0];

      const obj = {};
      Object.keys(HOST_MAPPING).forEach(key => {
        obj[key] = icpModel.convert(hostInfo, HOST_MAPPING[key]);
      });
      Object.keys(SITE_MAPPING).forEach(key => {
        obj[key] = icpModel.convert(site, SITE_MAPPING[key]);
      });

      this.sites.push(obj);
    });

    return this;
  }

  parseMaterial(materialInfo) {
    if (typeof materialInfo !== 'object' || materialInfo === null) return this;

    const icpModel = new IcpModel();
    const {webSiteManagerMaterialList} = materialInfo;
    webSiteManagerMaterialList.forEach(siteMaterial => {
      const {id} = siteMaterial;
      const site = this.sites.find(s => (s['site.id'] === id));
      site.webSiteManagerPhotoFrontPath = icpModel.convert(siteMaterial, 'webSiteManagerPhotoFrontPath');
    });

    return this;
  }
}

module.exports = VerifyModel;
