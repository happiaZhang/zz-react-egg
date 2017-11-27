'use strict';

/**
 * 路由配置
 */
module.exports = app => {
  /**
   * 管理员信息
   */
  app.get('/api/admin/view', 'admin.action');

  /**
   * ICP备案后台信息
   */
  app.all(/^\/api\/icp-admin(?:\/|$)/, 'icpAdmin.action');

  /**
   * 前端页面展示
   */
  app.get('/*', 'index.indexView');

  /**
   * 健康机制
   */
  app.all('/liveness', 'health.liveness');
  app.all('/readiness', 'health.readiness');
};
