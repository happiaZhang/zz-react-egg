'use strict';
/**
 * 健康机制
 */
module.exports = app => {
    return class HealthController extends app.Controller {

        /**
         * 容器正常启动
         */
        async liveness() {
            const { ctx } = this;

            ctx.status = 200;
            ctx.body = 'success';
        }

        /**
         * 容器所提供的服务正常
         */
        async readiness() {
            const { ctx } = this;

            //redis访问
            await ctx.app.redis.set('readiness', 'success', 'EX', 30);
            const data = await ctx.app.redis.get('readiness');

            ctx.status = 200;
            ctx.body = data;

        }

    }
};