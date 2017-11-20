'use strict';

/**
 * 基础配置
 */
module.exports = appInfo => {
  const config = {};

  // app key
  config.keys = 'bss-backoffice-node';

  // view 模版
  config.view = {
    defaultViewEngine: 'nunjucks',
    defaultExtension: '.html'
  };

  // 统一错误定义
  config.errors = require('./errors/config');
  // 正则表达式
  config.regex = require('./regex/config');
  // 用户权限
  config.permission = require('./permission/config');

  // api host
  config.adminHost = 'admin-management-rest-svc:8080';
  config.icpAdminHost = 'icp-admin-svc:8080';

  // middleware
  config.middleware = ['errorHandler', 'logger', 'isLogin', 'isPermission'];
  config.errorHandler = {
    match: '/api'
  };

  // redis
  config.redis = {
    client: {
      port: 6379,
      host: 'redis-primary.default',
      password: '',
      db: 0
    }
  };

  // log配置
  config.logger = {
    appLogName: `${appInfo.name}-web.log`,
    coreLogName: `${appInfo.name}.log`,
    agentLogName: `${appInfo.name}-agent.log`,
    errorLogName: `${appInfo.name}-common-error.log`,
    dir: `/var/log/${appInfo.name}`,
    consoleLevel: 'DEBUG',
    disableConsoleAfterReady: false
  };

  return config;
};
