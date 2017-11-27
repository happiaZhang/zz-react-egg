'use strict';

/**
 * ICP模块控制器
 */
module.exports = app => {
  return class IcpAdminController extends app.Controller {
    constructor(ctx) {
      super(ctx);
      this.prefix = '/api/icp-admin';
      this.host = this.config.icpAdminHost;
    }

    async action() {
      const {ctx} = this;
      const search = ctx.request.search;
      const method = ctx.method;
      const data = ctx.request.body;
      const svcName = ctx.request.path.substr(this.prefix.length + 1);
      ctx.body = await ctx.service.icpAdmin[svcName]({
        host: this.host,
        search,
        method,
        data
      });
    }
  };
};
