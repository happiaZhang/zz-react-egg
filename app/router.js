'use strict';

/**
 * 路由配置
 */
module.exports = app => {
  /**
   * 备案后台管理
   */
  app.all(/^\/api\/icp-admin\/([\w-.]+)$/, 'icpAdmin.action');

  /**
   * 账号后台管理
   */
  app.all(/^\/api\/acc-admin\/([\w-.]+)$/, 'accAdmin.action');

  /**
   * 前端页面展示
   */
  app.get(/^\/acc(?:\/|$)/, 'index.accView');
  app.get('/*', 'index.icpView');

  /**
   * 健康机制
   */
  app.all('/liveness', 'health.liveness');
  app.all('/readiness', 'health.readiness');
};
