//global： node环境的全局对象 vs window in JS
//process：the current node process object that controls the node process
process.on("exit", function () {
    //triggered when the process is about to end
})
//判断执行环境：
if (typeof(window) === 'undefined') {
    console.log('node.js');
} else {
    console.log('browser');
}

//////////////////////fs
var fs = require("node basics/module notes/fs");
//读取二进制文件
fs.readFile("whatever.png", function (err, data) {
    if(err){

    } else{
        //当不传入文件编码时， data返回一个buffer对象(包含0-many字节的数组）
        data.toString("utf-8");
    }
})

//获取文件信息
fs.stat("file", function (err, stat) { //stat为fs.stat返回的一个obj，包含文件信息
    if(err){}
    else{
        stat.isFile();
    }
    //只在启动时或者结束时可以使用同步代码
});



