/*
 * @Description: Description
 * @Author: 陆城锫
 * @Date: 2020-12-07 13:26:46
 */

module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://192.168.1.11:3000',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api':''
                }
            }
        }
    }
}