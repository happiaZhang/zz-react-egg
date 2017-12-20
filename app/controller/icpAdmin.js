const querystring = require('querystring');

/**
 * ICP模块控制器
 */
module.exports = app => {
  return class IcpAdminController extends app.Controller {
    constructor(ctx) {
      super(ctx);
      this.icpHost = this.config.icpAdminHost;
      this.adminHost = this.config.adminHost;
    }

    async action() {
      const {ctx} = this;
      const search = ctx.request.search;
      const method = ctx.method;
      const data = ctx.request.body;
      const svcName = ctx.params[0];
      const isAdmin = svcName === 'getAdminInfo';
      ctx.body = await ctx.service.icpAdmin[svcName]({
        host: isAdmin ? this.adminHost : this.icpHost,
        search: isAdmin ? '?' + querystring.stringify({token: ctx.state.token}) : search,
        method,
        data
      });
    }
  };
};
