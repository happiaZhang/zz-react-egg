'use strict';

/**
 * 首页模块控制器
 */
module.exports = app => {
  return class IndexController extends app.Controller {
    async indexView() {
      const {ctx} = this;
      // 生成视图
      await ctx.render('index');
    }
  };
};
