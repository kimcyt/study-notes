/*
MVC 分别指的是：

M: Model （数据)
V: View （表现）
C: Controller （逻辑）
在 Node 中，MVC 架构下处理请求的过程如下：

请求抵达服务端
服务端将请求交由路由处理
路由通过路径匹配，将请求导向对应的 controller
controller 收到请求，向 model 索要数据
model 给 controller 返回其所需数据
controller 可能需要对收到的数据做一些再加工
controller 将处理好的数据交给 view
view 根据数据和模板生成响应内容
服务端将此内容返回客户端


以此为依据，我们需要准备以下模块：

server: 监听和响应请求
router: 将请求交由正确的controller处理
controllers: 执行业务逻辑，从 model 中取出数据，传递给 view
model: 提供数据
view: 提供 html
 */
