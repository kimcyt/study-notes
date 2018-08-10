const controller = require("./controller");
// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
// 创建一个Koa对象表示web app本身:
const app = new Koa();

//koa-bodyparser解析原始POST request请求，然后，把解析后
//的参数绑定到ctx.request.body中

//!!!!!!koa-bodyparser必须在router之前被注册到app对象上
app.use(bodyParser());
// add router middleware:
app.use(controller());
//controller是controller.js exported的function, return router.routes()

// app.use(async (ctx, next) => {
//     if (await checkUserPermission(ctx)) {
//         await next();
//     } else {
//         ctx.response.status = 403; //停止继续
//     }
// });
app.listen(3000);
console.log('app started at port 3000...');

/////////////////////模板引擎：设立模板，把数据用指定的模板渲染成HTML，然后输出给浏览器

// const nunjucks = require('nunjucks');
//
// function createEnv(path, opts) { //opts is the obj provided
//     var
//         autoescape = opts.autoescape === undefined ? true : opts.autoescape,
//         //if true: all output will automatically be escaped for safe output
//         noCache = opts.noCache || false,
//         watch = opts.watch || false,
//         throwOnUndefined = opts.throwOnUndefined || false,
//         //set up env
//         env = new nunjucks.Environment(
//             new nunjucks.FileSystemLoader('views', {
//                 noCache: noCache,
//                 watch: watch,
//             }), {
//                 autoescape: autoescape,
//                 throwOnUndefined: throwOnUndefined
//             });
//     if (opts.filters) {
//         for (var f in opts.filters) {
//             env.addFilter(f, opts.filters[f]);
//         }
//     }
//     return env;
// }
// //变量env就表示Nunjucks模板引擎对象
// var env = createEnv('views', {
//     watch: true,
//     filters: {
//         hex: function (n) {
//             return '0x' + n.toString(16);
//         }
//     }
// });

