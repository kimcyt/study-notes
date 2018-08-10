/*
-编写一个hello.js文件，这个hello.js文件就是一个模块，
模块的名字就是文件名（去掉.js后缀），所以hello.js文件就是名为hello的模块

-在模块中定义的函数可用module.exports = 函数名 作为模块的输出暴露出去
ie. module.exports = greet; //greet() 是hello.js里的一个函数
在其他模块里使用： var sth = require("./hello); //要有path

-一个模块想要对外暴露变量（函数也是变量），可以用module.exports = variable;，
一个模块要引用其他模块暴露的变量，用var ref = require('module_name');就拿到了
引用模块的变量。

module.exports = {
    foo: function () { return 'foo'; }
};
或者：
module.exports = function () { return 'foo'; };
 */