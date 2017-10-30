'use strict';

/**
 * context 扩展
 */
module.exports = {

    /**
     * API调用结果处理
     * @param {Object} result 返回结果
     */
    restfulResultCheck(result) {
        const { errors } = this.app.config;
        const errorMsg = result.data && result.data.errorMessage ? result.data.errorMessage : 'api error';

        //后端接口错误
        if (result.status !== 200) {
            this.throw(errors.Api_Error, errorMsg);
        }
    },

    /**
     * 文件流输出
     * @param {Object} result 返回结果
     */
    fileStreamExport(data, filename = 'export.txt') {

        //文件流格式设置
        this.set({
            'Content-Type': 'application/octet-stream',
            'Content-Disposition': `attachment; filename=${filename}`
        });
        this.body = data;
    }
};
