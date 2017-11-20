'use strict';

module.exports = appInfo => {
  return {
    // redis
    redis: {
      client: {
        port: 6379,
        host: 'redis-primary.infra',
        password: '',
        db: 0
      }
    }
  };
};
