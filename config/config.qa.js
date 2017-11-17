'use strict';

/**
 * 生产环境配置
 */
module.exports = appInfo => {
  return {
    // api host
    adminHost: 'admin-management-rest-svc:8080',
    icpAdminHost: 'icp-admin-svc:8080',

    // middleware
    middleware: ['errorHandler', 'logger', 'isLogin', 'isPermission'],
    errorHandler: {
      match: '/api'
    },

    // redis
    redis: {
      client: {
        port: 6379,
        host: 'redis-primary.infra',
        password: '',
        db: 0
      }
    },

    // log配置
    logger: {
      appLogName: `${appInfo.name}-web.log`,
      coreLogName: `${appInfo.name}.log`,
      agentLogName: `${appInfo.name}-agent.log`,
      errorLogName: `${appInfo.name}-common-error.log`,
      dir: `/var/log/${appInfo.name}`,
      consoleLevel: 'DEBUG',
      disableConsoleAfterReady: false
    }
  };
};
