'use strict';

module.exports = appInfo => {
  return {
    // api host
    adminHost: 'http://10.214.169.111:32730',
    icpAdminHost: 'http://10.214.169.111:32356',

    // middleware
    middleware: ['errorHandler', 'logger', 'isLogin', 'isPermission'],
    errorHandler: {
      match: '/api'
    },

    // redis
    redis: {
      client: {
        port: 6379,
        host: 'redis-primary.default',
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
