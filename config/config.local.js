'use strict';

module.exports = {
  // admin login page
  adminDomainURI: 'https://bo.cloud.wanda.cn',

  // apiHost
  adminHost: 'http://10.214.169.111:32730',
  // 10.15.132.148:8080 || 10.15.134.195:8081 || 10.214.169.111:32356
  icpAdminHost: 'http://10.214.169.111:32356',

  // redis
  redis: {
    client: {
      port: 31489,
      host: '10.214.169.111',
      password: '',
      db: 0
    }
  }
};
