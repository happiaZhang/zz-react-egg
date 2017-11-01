'use strict';

/**
 * 首页模块控制器
 */
module.exports = app => {
  return class IndexController extends app.Controller {
    /**
     * 静态页面加载视图
     */
    async indexView() {
      // 生成视图
      await this.ctx.render('index');
    }
  };
};
