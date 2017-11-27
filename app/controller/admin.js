const querystring = require('querystring');

/**
 * 管理员模块控制器
 */
module.exports = app => {
  return class AdminController extends app.Controller {
    constructor(ctx) {
      super(ctx);
      this.host = this.config.adminHost;
    }

    async action() {
      const {ctx} = this;
      const method = ctx.method;
      const data = ctx.request.body;
      ctx.body = await ctx.service.admin.getAdminInfo({
        host: this.host,
        search: '?' + querystring.stringify({token: ctx.state.token}),
        method,
        data
      });
    }
  };
};
