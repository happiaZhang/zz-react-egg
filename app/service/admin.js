module.exports = app => {
  class Admin extends app.Service {
    constructor(ctx) {
      super(ctx);
      this.request = this.ctx.service.utils.request;
      this.checkResponse = this.ctx.service.utils.checkResponse;
    }

    async getAdminInfo(opts) {
      const result = await this.request('/userrest/view', opts);
      return this.checkResponse(result);
    }
  }
  return Admin;
};
