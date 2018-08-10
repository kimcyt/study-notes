//REST api
/*
REST（Representational State Transfer）为Web API的标准.
如果一个URL返回的不是HTML，而是机器能直接解析的数据，这个URL就可以看成是一个Web API。

REST就是一种设计API的模式。最常用的数据格式是JSON。由于JSON能直接被JavaScript读取，
所以，以JSON格式编写的REST风格的API具有简单、易读、易用的特点。
编写API有什么好处呢？由于API就是把Web App的功能全部封装了，所以，通过API操作数据，
可以极大地把前端和后端的代码隔离，使得后端代码易于测试，前端代码编写更简单。
此外，如果
+我们把前端页面看作是一种用于展示的客户端，那么API就是为客户端提供数据、
操作数据的接口。这种设计可以获得极高的扩展性。例如，当用户需要在手机上购买商品时，
只需要开发针对iOS和Android的两个客户端，通过客户端访问API，就可以完成通过浏览器
页面提供的功能，而后端代码基本无需改动。

REST API规范
编写REST API，实际上就是编写处理HTTP请求的async函数，不过，REST请求和普通的
HTTP请求有几个特殊的地方：
REST请求仍然是标准的HTTP请求，但是，除了GET请求外，POST、PUT等请求的body是JSON数据格式，
请求的Content-Type为application/json；
REST响应返回的结果是JSON数据格式，因此，响应的Content-Type也是application/json。

REST规范定义了资源的通用访问格式，虽然它不是一个强制要求，但遵守该规范可以让人易于理解。
例如，商品Product就是一种资源。获取所有Product的URL如下：
GET /api/products
 */

// 存储Product列表，相当于模拟数据库:
var products = [{
    name: 'iPhone',
    price: 6999
}, {
    name: 'Kindle',
    price: 999
}];

module.exports = {
    'GET /api/products': async (ctx, next) => {
        // 设置Content-Type:
        ctx.response.type = 'application/json';
        // 设置Response Body:
        ctx.response.body = {
            //在koa中，我们只需要给ctx.response.body赋值一个JavaScript对象，
            // koa会自动把该对象序列化为JSON并输出到客户端。
            products: products
        };
    },
    'POST /api/products': async (ctx, next) => {
        var p = {
            //获得客户端提供的数据
            name: ctx.request.body.name,
            price: ctx.request.body.price
        };
        products.push(p); //添加products
        ctx.response.type = 'application/json';
        ctx.response.body = p;
    }
}

//我们在浏览器中访问http://localhost:3000/api/products，可以得到如下输出：

//{"products":[{"name":"iPhone","price":6999},{"name":"Kindle","price":999}]}