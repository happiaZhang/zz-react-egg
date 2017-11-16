'use strict';

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
      // 获取用户的信息
      const res = await app.curl(`${this.host}/userrest/view`, {
        method: 'GET',
        dataType: 'json',
        data: {
          token: ctx.state.token
        }
      });

      console.log(res);
      this.ctx.restfulResultCheck(res);

      // 成功返回
      ctx.helper.json(0, 'success', res.data);
    }
  };
};
