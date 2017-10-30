'use strict';

/**
 * 本地开发环境配置
 */
module.exports = {

    // apiHost
    adminHost: 'http://10.214.169.111:31747',
    adminInvoiceHost: 'http://10.214.169.111:31725',

    //redis
    redis: {
        client: {
            port: 31489,
            host: '10.214.169.111',
            password: '',
            db: 0
        }
    },
};