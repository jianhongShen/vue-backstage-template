// const path = require('path');

module.exports = {
    devServer: {
        port:8083,
        proxy: {
          "/api": {
            //如果要代理 websockets，配置这个参数
            ws: true, 
            logLevel:"debug",
            target: "http://mock",
            pathRewrite: {
              "^/api": ""
            }
          }
        }
    }
}