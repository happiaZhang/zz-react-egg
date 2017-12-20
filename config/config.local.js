'use strict';

module.exports = {
  // apiHost
  adminHost: 'http://10.214.169.111:32730',
  // 10.15.132.148:8080 || 10.214.169.111:32356 || 10.100.222.185:30261
  icpAdminHost: 'http://10.214.169.111:32356',
  accAdminHost: 'http://10.214.169.111:30303',

  // middleware
  middleware: ['logger'],

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
