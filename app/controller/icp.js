'use strict';

/**
 * ICP模块控制器
 */
module.exports = app => {

    return class IcpController extends app.Controller {
        constructor(ctx) {
            super(ctx);
            this.prefix = '/api/icp';
            this.host = this.config.icpHost;
        }

        async action() {
            const { ctx } = this;
            const url = this.host + ctx.url.substr(this.prefix.length);
            const payload = {
                dataType: 'json',
                method: ctx.method
            };

            // 获取数据
            const res = await app.curl(url, payload);

            console.log(res);
            ctx.restfulResultCheck(res);

            // 成功返回
            ctx.helper.json(0, 'success', res.data);
        }
    }
};
