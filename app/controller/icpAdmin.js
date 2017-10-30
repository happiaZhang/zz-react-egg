'use strict';

/**
 * ICP模块控制器
 */
module.exports = app => {

    return class IcpAdminController extends app.Controller {
        constructor(ctx) {
            super(ctx);
            this.prefix = '/api/icp-admin';
            this.host = this.config.icpAdminHost;
        }

        async action() {
            const { ctx } = this;
            const body = ctx.request.body;
            const url = this.host + ctx.url.substr(this.prefix.length);
            const payload = {
                dataType: 'json',
                method: ctx.method
            };
            if (body) payload.data = ctx.request.body;
            console.log(payload.data);
            // 获取数据
            const res = await app.curl(url, payload);

            console.log(res);
            ctx.restfulResultCheck(res);

            // 成功返回
            ctx.helper.json(0, 'success', res.data);
        }


    }
};
