# express urls-router
    express router 插件
# urls-router
    在app.js  相同目录下创建urls_router.js
    urls_router.js 示例:
        var test = require("./routes/test_router");
        
        module.exports = {
            urls: {
                "/test": [{
                    url: "/test",
                    action: test.index,
                    type: "get"
                }]
            },
            filter: {
                "/api": function (req, res, next) {
                    console.log("api filter")
                    next()
                }
            }
        };
    test_router.js 示例
        module.exports = {
            index: function (req, res, next) {
                res.send('respond with a resource');
            },
            test: function (req, res, next) {
                res.send('test');
            }
        }
        
    app.js 示例
        var urlsRouter = require('urls-router');
        var app = express();
        urlsRouter(app,path.join(__dirname, 'urls_router.js'))
    
    其他使用方式与原生express无差别