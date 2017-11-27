module.exports = app => {
  class Admin extends app.Service {
    constructor(ctx) {
      super(ctx);
      this.request = this.ctx.fetch;
      this.checkResponse = this.ctx.checkFetch;
    }

    async getAdminInfo(opts) {
      const result = await this.request('/userrest/view', opts);
      return this.checkResponse(result);
    }
  }
  return Admin;
};
