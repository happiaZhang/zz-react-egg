class IcpModel {
  constructor() {
    this.host = {};
    this.sites = [{}];
  }

  convert(data, key) {
    const keySet = key.split('.');
    const counter = keySet.length;
    let result = '';
    let d = {...data};
    for (let i = 0; i < counter; i++) {
      const k = keySet[i];
      if (d[k] == null) break;
      (i === counter - 1) ? result = d[k] : d = {...d[k]};
    }
    return result;
  }

  parseHost(hostInfo) {
    if (typeof hostInfo !== 'object') return this;

    const HOST_MAPPING = {
      'host.address': 'hostUnitFullDto.address',
      'host.filingNum': 'hostUnitFullDto.filingNum',
      'host.filingPassword': 'hostUnitFullDto.filingPassword',
      'host.credentialNumber': 'hostUnitFullDto.hostUnitBasicDto.credentialNumber',
      'host.credentialType': 'hostUnitFullDto.hostUnitBasicDto.credentialType',
      'host.hostType': 'hostUnitFullDto.hostUnitBasicDto.hostType',
      'host.region': 'hostUnitFullDto.hostUnitBasicDto.region',
      'host.hostUnitName': 'hostUnitFullDto.hostUnitName',
      'host.investor': 'hostUnitFullDto.investor',
      'host.residence': 'hostUnitFullDto.residence',
      'hostManager.credentialNumber': 'hostUnitManagerDto.credentialNumber',
      'hostManager.credentialType': 'hostUnitManagerDto.credentialType',
      'hostManager.email': 'hostUnitManagerDto.email',
      'hostManager.mobilePhone': 'hostUnitManagerDto.mobilePhone',
      'hostManager.name': 'hostUnitManagerDto.name',
      'hostManager.officePhone': 'hostUnitManagerDto.officePhone',
      'hostManager.remark': 'hostUnitManagerDto.remark'
    };

    Object.keys(HOST_MAPPING).forEach(key => {
      this.host[key] = this.convert(hostInfo, HOST_MAPPING[key]);
    });

    return this;
  }

  parseSites(siteInfo) {
    if (!(siteInfo instanceof Array) || siteInfo.length === 0) return this;
    this.sites.length = 0;

    const SITE_MAPPING = {
      'site.id': 'webSiteBasicInfoDto.id',
      'site.name': 'webSiteBasicInfoDto.name',
      'site.verifiedDomain': 'webSiteBasicInfoDto.verifiedDomain',
      'site.indexUrl': 'webSiteBasicInfoDto.indexUrl',
      'site.serviceContent': 'webSiteBasicInfoDto.serviceContent',
      'site.language': 'webSiteBasicInfoDto.language',
      'site.auditContent': 'webSiteBasicInfoDto.auditContent',
      'site.remark': 'webSiteBasicInfoDto.remark',
      'siteManager.id': 'webSiteManagerInfo.id',
      'siteManager.name': 'webSiteManagerInfo.name',
      'siteManager.mobilePhone': 'webSiteManagerInfo.mobilePhone',
      'siteManager.credentialType': 'webSiteManagerInfo.credentialType',
      'siteManager.credentialNumber': 'webSiteManagerInfo.credentialNumber',
      'siteManager.email': 'webSiteManagerInfo.email',
      'siteManager.photoPath': 'webSiteManagerInfo.photoPath',
      'siteManager.rejectReason': 'webSiteManagerInfo.rejectReason'
    };

    siteInfo.forEach(site => {
      const {listWebSiteManagerInfo} = site;
      if (listWebSiteManagerInfo.length > 0) site.webSiteManagerInfo = listWebSiteManagerInfo[0];

      const obj = {};
      Object.keys(SITE_MAPPING).forEach(key => {
        obj[key] = this.convert(site, SITE_MAPPING[key]);

        if (key === 'site.auditContent') {
          try {
            const auditContent = JSON.parse(obj[key]);
            obj[key] = auditContent.value || '';
            const auditFiles = auditContent.files;
            if (auditFiles instanceof Array) obj['site.auditFiles'] = JSON.stringify(auditFiles);
          } catch (error) {
            obj[key] = '';
          }
        }
      });

      this.sites.push(obj);
    });

    return this;
  }

  parseMaterial(materialInfo) {
    if (typeof materialInfo !== 'object' || materialInfo === null) return this;

    this.getHostPhoto().forEach(key => {
      this.host[`host.${key}`] = this.convert(materialInfo, key);
    });

    const {webSiteManagerMaterialList} = materialInfo;
    webSiteManagerMaterialList.forEach(siteMaterial => {
      const {id} = siteMaterial;
      const site = this.sites.find(s => (s['site.id'] === id));

      this.getSitePhoto().forEach(key => {
        site[`site.${key}`] = this.convert(siteMaterial, key);
      });
    });

    return this;
  }

  getHostPhoto() {
    return [
      'hostBusinessLicensePhotoPath',
      'hostManagerIDPhotoBackPath',
      'hostManagerIDPhotoFrontPath'
    ];
  }

  getSitePhoto() {
    return [
      'webSiteFilingVerifyPhotoPath',
      'webSiteManagerPhotoBackPath',
      'webSiteManagerPhotoFrontPath'
    ];
  }
}

module.exports = IcpModel;
