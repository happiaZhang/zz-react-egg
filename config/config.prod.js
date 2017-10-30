'use strict';

/**
 * 生产环境配置
 */
module.exports = {

    // apiHost
    adminHost: 'admin-management-rest-svc:8884',
    adminInvoiceHost: 'wandacloud-invoice-admin-svc:8889',

    //redis
    redis: {
        client: {
            port: 6379,
            host: 'redis-primary.default',
            password: '',
            db: 0
        }
    },

};