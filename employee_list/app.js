
const koa = require('koa');
const bodyParser = require("koa-bodyParser");
const controller = require("./controller");
//Koa中间件-koa-static能将项目的某个目录（一般是static或者public目录）
// 的文件映射到路由上，使得这些文件能通过url在浏览器访问到。
const static = require("koa-static");
const mount = require("koa-mount");
const app = new koa;


app.use(bodyParser());
app.use(controller()); //route dynamic urls

app.use(mount("/static", static(__dirname + "/static")));
//route static resources
//use mount to set path to static resources


app.listen(3000);

