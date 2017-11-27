const IcpModel = require('./icpModel');

class RejectModel {
  constructor() {
    this.hostInfo = {};
    this.hostUnit = [];
    this.hostUnitManager = [];
    this.websiteManagerInfo = [];
    this.websiteInfo = [];
    this.materialInfo = {};
    this.hostManagerItems = [];
    this.webSitePhotoItems = [];
    const icpModel = new IcpModel();
    this.hostPhoto = icpModel.getHostPhoto();
    this.sitePhoto = icpModel.getSitePhoto();
  }

  isEmpty(v) {
    if (v instanceof Array) return v.length === 0;
    if (typeof v === 'object') return Object.keys(v).length === 0;
    return true;
  }

  obj2Arr(obj, kk, kv) {
    const arr = [];
    Object.keys(obj).forEach(k => {
      arr.push({[kk]: k, [kv]: obj[k]});
    });
    return arr;
  }

  parse(rejectStr) {
    const {rejectReason, host, site} = JSON.parse(rejectStr);
    if (host) this.parseHost(host);

    site && Object.keys(site).forEach(id => {
      const siteItems = site[id];
      if (!this.isEmpty(siteItems)) this.parseSite(siteItems, id);
    });
    if (!this.isEmpty(this.hostManagerItems)) this.materialInfo['hostManagerItems'] = this.hostManagerItems;
    if (!this.isEmpty(this.webSitePhotoItems)) this.materialInfo['webSitePhotoItems'] = this.webSitePhotoItems;

    const result = {rejectReason};
    if (!this.isEmpty(this.hostInfo)) result.hostInfo = this.hostInfo;
    if (!this.isEmpty(this.websiteManagerInfo)) result.websiteManagerInfo = this.websiteManagerInfo;
    if (!this.isEmpty(this.websiteInfo)) result.websiteInfo = this.websiteInfo;
    if (!this.isEmpty(this.materialInfo)) result.materialInfo = this.materialInfo;
    return JSON.stringify(result);
  }

  parseHost(host) {
    host.forEach(key => {
      const keyComp = key.split('.');
      const type = keyComp[0];
      const field = keyComp[1];

      if (this.hostPhoto.findIndex(path => path === field) > -1) {
        this.hostManagerItems.push(field);
      } else {
        if (type === 'host') this.hostUnit.push(field);
        if (type === 'hostManager') this.hostUnitManager.push(field);
      }
    });

    if (!this.isEmpty(this.hostUnit)) this.hostInfo['hostUnit'] = this.hostUnit;
    if (!this.isEmpty(this.hostUnitManager)) this.hostInfo['hostUnitManager'] = this.hostUnitManager;
  }

  parseSite(site, id) {
    const verifiedDomain = [];
    const auditContent = {};
    const webSitePhotoItems = [];
    const websiteInfo = {};
    const websiteItems = [];
    const websiteManagerInfo = {};
    const websiteManagerItems = [];
    const counter = site.length;

    for (let i = 0; i < counter; i++) {
      let [item, key, name, category] = [site[i], null, null, null];

      if (item.indexOf('|') > -1) {
        category = item.split('|')[1];
        item = item.split('|')[0];
      }

      if (item.indexOf('_') > -1) {
        name = item.split('_')[1];
        key = item.split('_')[0];
      }

      if (key === null) key = item;

      if (category !== null) {
        if (!auditContent.hasOwnProperty(name)) auditContent[name] = [];
        auditContent[name].push(category);
        break;
      }

      if (name !== null) {
        verifiedDomain.push(name);
        break;
      }

      const type = key.split('.')[0];
      const field = key.split('.')[1];

      if (this.sitePhoto.findIndex(path => path === field) > -1) {
        webSitePhotoItems.push(field);
        break;
      }

      if (type === 'site') websiteItems.push(field);
      if (type === 'siteManager') websiteManagerItems.push(field);
    }

    if (!this.isEmpty(auditContent)) websiteInfo.auditContent = this.obj2Arr(auditContent, 'key', 'items');
    if (!this.isEmpty(verifiedDomain)) websiteInfo.verifiedDomain = verifiedDomain;
    if (!this.isEmpty(websiteItems)) websiteInfo.otherItems = websiteItems;
    if (!this.isEmpty(websiteManagerItems)) websiteManagerInfo.warnItems = websiteManagerItems;

    if (!this.isEmpty(websiteInfo)) {
      websiteInfo.id = id;
      this.websiteInfo.push(websiteInfo);
    }
    if (!this.isEmpty(websiteManagerInfo)) {
      websiteManagerInfo.id = id;
      this.websiteManagerInfo.push(websiteManagerInfo);
    }
    if (!this.isEmpty(webSitePhotoItems)) this.webSitePhotoItems.push({id, warnItems: webSitePhotoItems});
  }
}

module.exports = RejectModel;
