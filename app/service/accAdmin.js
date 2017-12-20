const AccModel = require('./accModel');

module.exports = app => {
  class AccAdmin extends app.Service {
    constructor(ctx) {
      super(ctx);
      this.request = this.ctx.fetch;
      this.checkResponse = this.ctx.checkFetch;
    }

    async queryUserVerifyRecord(opts) {
      const result = await this.request('/QueryUserVerifyRecord', opts);
      return this.checkResponse(result);
    }

    async getUserVerifyRecord(opts) {
      const userRecord = await this.queryUserVerifyRecord(opts);
      const {code, data} = userRecord;
      if (code || data.code !== '0') return {code: 500, msg: 'internal server error', data: null};
      const accModel = new AccModel();
      const acc = accModel.parse(data.data);
      return {code: 0, msg: null, data: acc};
    }

    async setUserVerifyRecord(opts) {
      const result = await this.request('/ModifyUserVerifyRecord', opts);
      return this.checkResponse(result);
    }
  }
  return AccAdmin;
};
