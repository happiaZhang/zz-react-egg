const querystring = require('querystring');
const IcpModel = require('./icpModel');
const VerifyModel = require('./verifyModel');
const AuditModel = require('./auditModel');
const RejectModel = require('./rejectModel');
const Workbook = require('./workbook');

module.exports = app => {
  class IcpAdmin extends app.Service {
    constructor(ctx) {
      super(ctx);
      this.request = this.ctx.service.utils.request;
      this.checkResponse = this.ctx.service.utils.checkResponse;
    }

    async getAllWebsiteInfo(opts) {
      const result = await this.request('/filing-admin/all-website-info', opts);
      return this.checkResponse(result);
    }

    async setCurtainDeliveryInfo(opts) {
      const result = await this.request('/filing-admin/curtain-delivery-info', opts);
      return this.checkResponse(result);
    }

    async getCurtainInfo(opts) {
      const result = await this.request('/filing-admin/curtain-info', opts);
      return this.checkResponse(result);
    }

    async setFilingNo(opts) {
      const result = await this.request('/filing-admin/filing-no', opts);
      return this.checkResponse(result);
    }

    async setFilingStatus(opts) {
      const result = await this.request('/filing-admin/filing-status', opts);
      return this.checkResponse(result);
    }

    async getHostInfo(opts) {
      const result = await this.request('/filing-admin/host-info', opts);
      return this.checkResponse(result);
    }

    async getHostInfoMaterial(opts) {
      const result = await this.request('/filing-admin/host-info-material', opts);
      return this.checkResponse(result);
    }

    async getHostRevokeInfo(opts) {
      const result = await this.request('/filing-admin/host-revoke-info', opts);
      return this.checkResponse(result);
    }

    async getInfoSummaryNonRevoked(opts) {
      const result = await this.request('/filing-admin/info-summary-non-revoked', opts);
      return this.checkResponse(result);
    }

    async getInfoSummaryRevoked(opts) {
      const result = await this.request('/filing-admin/info-summary-revoked', opts);
      return this.checkResponse(result);
    }

    async getSiteAccesscancelledInfo(opts) {
      const result = await this.request('/filing-admin/site-accesscancelled-info', opts);
      return this.checkResponse(result);
    }

    async getSiteRevokeInfo(opts) {
      const result = await this.request('/filing-admin/site-revoke-info', opts);
      return this.checkResponse(result);
    }

    async getTrialInfo(opts) {
      const hostInfo = await this.getHostInfo(opts);
      if (hostInfo.code) return hostInfo;
      const siteInfo = await this.getAllWebsiteInfo(opts);
      if (siteInfo.code) return siteInfo;
      const materialInfo = await this.getHostInfoMaterial(opts);
      if (materialInfo.code) return materialInfo;

      const data = new IcpModel();
      data.parseHost(hostInfo.data)
        .parseSites(siteInfo.data.listWebSiteInfo)
        .parseMaterial(materialInfo.data);
      return {
        code: 0,
        msg: null,
        data
      };
    }

    async getVerifyInfo(opts) {
      const hostInfo = await this.getHostInfo(opts);
      if (hostInfo.code) return hostInfo;
      const siteInfo = await this.getAllWebsiteInfo(opts);
      if (siteInfo.code) return siteInfo;
      const materialInfo = await this.getHostInfoMaterial(opts);
      if (materialInfo.code) return materialInfo;

      const data = new VerifyModel();
      data.parse(hostInfo.data, siteInfo.data.listWebSiteInfo)
        .parseMaterial(materialInfo.data);
      return {
        code: 0,
        msg: null,
        data
      };
    }

    async getAuditResolveInfo(opts) {
      const hostInfo = await this.getHostInfo(opts);
      if (hostInfo.code) return hostInfo;
      const siteInfo = await this.getAllWebsiteInfo(opts);
      if (siteInfo.code) return siteInfo;

      const data = new AuditModel();
      data.parseHost(hostInfo.data)
        .parseSites(siteInfo.data.listWebSiteInfo);
      return {
        code: 0,
        msg: null,
        data
      };
    }

    async getExcel(opts) {
      let summary = null;
      const {search} = opts;
      const {queryType} = querystring.parse(search.substr(1));
      if (queryType === '4' || queryType === '5') {
        summary = await this.getInfoSummaryNonRevoked(opts);
      } else {
        summary = await this.getInfoSummaryRevoked(opts);
      }
      if (summary.code) return summary;

      const wb = new Workbook();
      const data = wb.parse(summary.data.elements).write();
      return {
        code: 0,
        msg: null,
        data
      };
    }

    async setTrailStatus(opts) {
      const {data} = opts;
      const rejectReason = data.rejectReason;
      if (rejectReason.length > 0) {
        const rejectModel = new RejectModel();
        data.rejectReason = rejectModel.parse(rejectReason);
      }

      const filingStatus = await this.setFilingStatus(opts);
      return filingStatus;
    }
  }
  return IcpAdmin;
};
