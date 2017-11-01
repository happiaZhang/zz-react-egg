'use strict';

/**
 * 生产环境配置
 */
module.exports = {
  // api host
  adminHost: 'http://10.214.169.111:32730',
  icpAdminHost: 'http://10.214.169.111:32356',

  // redis
  redis: {
    client: {
      port: 6379,
      host: 'redis-primary.default',
      password: '',
      db: 0
    }
  }
};
