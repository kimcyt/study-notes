//MVC：为了解决直接用脚本语言嵌入HTML导致的可维护性差的问题，Web应用也引入了
//Model-View-Controller的模式，来简化Web开发。ASP发展为ASP.Net，JSP和PHP也有一大堆MVC框架。

//常见的Web框架包括：Express，Sails.js，koa，Meteor，DerbyJS，Total.js，restify……

/////////////////////////KOA：Express的下一代基于Node.js的web框架

// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');
// 创建一个Koa对象表示web app本身:
const router = require("koa-router")(); //注意有个call
const app = new Koa();

// 每收到一个http请求，koa就会调用通过app.use()注册的async函数，并传入ctx和next参数。
//koa把很多async函数组成一个处理链，每个async函数(middleware)都可以做一些自己的事情，
//然后用await next()来调用下一个async函数
app.use(async (ctx, next) => { //next: koa传入的将要处理的下一个异步函数
    console.log(`${ctx.request.method} ${ctx.request.url}`);
    //参数ctx是由koa传入的封装了request和response的变量, 通过它访问request和response
    await next(); // 调用下一个middleware
});

//add url-router
router.get('/hello/:name', async (ctx, next) => {//在请求路径中使用变量
    var name = ctx.params.name;//访问变量(用户输入的url）
    ctx.response.body = `<h1>Hello, ${name}!</h1>`;
});
router.get('/', async (ctx, next) => {
    ctx.response.body = '<h1>Index</h1>';
});

/////如果是POST： post请求通常会发送一个表单，或者JSON，它作为request的body发送
//需要引入另一个middleware： koa-bodyparser来解析原始request请求，然后，把解析后
// 的参数绑定到ctx.request.body中

//!!!!!!koa-bodyparser必须在router之前被注册到app对象上
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());
router.post('/signin', async (ctx, next) => {
    var
        name = ctx.request.body.name || '', //获得表单name
        password = ctx.request.body.password || '';

    console.log(`signin with name: ${name}, password: ${password}`);
    if (name === 'koa' && password === '12345') {
        ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
    } else {
        ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`;
    }
});
// add router middleware:
app.use(router.routes());


//如果一个middleware没有调用await next()，后续的middleware将不再执行了
app.use(async (ctx, next) => {
    if (await checkUserPermission(ctx)) {
        await next();
    } else {
        ctx.response.status = 403; //停止继续
    }
});
app.listen(3000);
console.log('app started at port 3000...');


