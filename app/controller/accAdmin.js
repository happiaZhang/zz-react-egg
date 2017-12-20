/**
 * ACC模块控制器
 */
module.exports = app => {
  return class IcpAdminController extends app.Controller {
    constructor(ctx) {
      super(ctx);
      this.accHost = this.config.accAdminHost;
    }

    async action() {
      const {ctx} = this;
      const search = ctx.request.search;
      const method = ctx.method;
      const data = ctx.request.body;
      const svcName = ctx.params[0];
      ctx.body = await ctx.service.accAdmin[svcName]({
        host: this.accHost,
        search,
        method,
        data
      });
    }
  };
};
