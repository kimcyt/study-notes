var fs = require("fs");

function addMapping(router, mapping) {
    for (var url in mapping) {  // ie. 'GET /'
        if (url.startsWith('GET ')) {
            // 如果url类似"GET xxx":
            var path = url.substring(4); //获取命令后的地址
            router.get(path, mapping[url]); //给每个url绑定对应的处理函数(为asycn function)
            console.log(`register URL mapping: GET ${path}`);}
        else if (url.startsWith('POST ')) {
            // 如果url类似"POST xxx":
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else {
            // 无效的URL:
            console.log(`invalid URL: ${url}`);
        }
    }
}

function addControllers(router, dir) {
    // 先导入fs模块，然后用readdirSync列出文件
    // 这里可以用sync是因为启动时只运行一次，不存在性能问题:

    //__dirname：    获得当前执行文件所在目录的完整目录名
    //__filename：   获得当前执行文件的带有完整绝对路径的文件名
    //process.cwd()：获得当前执行node命令时候的文件夹目录名
    //    ./：           文件所在目录
    var files = fs.readdirSync(__dirname + '/' + dir);
    //read all files under controllers

    // 过滤出.js文件:
    var js_files = files.filter((f) => {
        return f.endsWith('.js');
    });

    // 处理每个js文件:
    for (var f of js_files) {
        console.log(`process controller: ${f}...`);
        // 导入js文件:
        let mapping = require(__dirname + '/' + dir + '/' + f);
        //mapping 为 module exports 的 obj
        //module.exports = {   //keys as urls
        //     'GET /': fn_index,
        //     'POST /signin': fn_signin
        // };
        addMapping(router, mapping);
    }
}

module.exports = function (dir) {
    let
        controllers_dir = dir || "controllers", //// 如果不传参数，扫描目录默认为'controllers'
        router = require("koa-router")();

    addControllers(router, controllers_dir);
    return router.routes();
};



