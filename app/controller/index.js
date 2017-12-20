'use strict';

/**
 * 首页模块控制器
 */
module.exports = app => {
  return class IndexController extends app.Controller {
    async icpView() {
      const {ctx} = this;
      await ctx.render('index');
    }

    async accView() {
      const {ctx} = this;
      await ctx.render('acc');
    }
  };
};
