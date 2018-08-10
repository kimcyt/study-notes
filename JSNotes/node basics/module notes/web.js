//域名解析
var dns = require("dns");
var http = require('http');

dns.lookup("www.sgd.com", function (err, address, family) {
    //the address is the corresponding ip
})
//如域名对应多个ip，获取多个IP：
var option = {all: true};
dns.lookup("www...", option, function (same) {});
dns.resolve4()//同样作用但不受host配置影响


//////////////////////////////////////////////////////////////////////http模块

//req是http.IncomingMessage实例，在服务端、客户端作用略微有差异
//服务端处：获取请求方的相关信息，如request header等。
//客户端处：获取响应方返回的相关信息，如statusCode等。

//服务端例子：下面的 req

var server = http.createServer(function(req, res){ //有method属性：ie.POST
    // res设置状态码、状态描述信息、响应主体, 增删改查header
    //close：response.end() 被调用前，连接就断开了。此时会触发这个事件。
    //finish：响应header、body都已经发送出去（交给操作系统，排队等候传输），但客户端是否实际收到数据为止。（这个事件后，res 上就不会再有其他事件触发）
    console.log(req.headers);
    res.writeHead(...); //可以通过设定属性去设置header，但是writeHead()会覆盖并finalize这些设定
    res.end('ok');
});
server.listen(3000);

//客户端例子：// 下面的res
http.get('http://127.0.0.1:3000', function(res){ //有statusCode/Message属性， ie.200:OK
    console.log(res.statusCode);
});//用get()的method为GET
//或者把设置的对象传入request来构造请求
var options = {
    protocol: 'http:',
    hostname: 'id.qq.com',
    port: '80',
    path: '/',
    method: 'GET'  //可以是POST，要在headers 里声明content-type
};
client = http.request(options, function(res){});


//将客户端发送过来的数据回传
var createClientPostRequest = function(){
    var options = {
        method: 'POST',
        protocol: 'http:',
        hostname: '127.0.0.1',
        port: '3000',
        path: '/post',
        headers: {
            "connection": "keep-alive",
            "content-type": "application/x-www-form-urlencoded"
        }
    };
    // 发送给服务端的数据
    var postBody = {
        nick: 'chyingp'
    };
    // 创建客户端请求
    var client = http.request(options, function(res){
        // 最终输出：Server got client data: nick=chyingp
        res.pipe(process.stdout); //打印到client的stdout上
    });
    // 发送的报文主体，记得先用 querystring.stringify() 处理下
    client.write( querystring.stringify(postBody) );
    client.end();
    //can also use client.on("response", function(res){}) to listen to the server response
};

// 服务端程序，只是负责回传客户端数据
var server = http.createServer(function(req, res){
    res.write('Server got client data: ');
    req.pipe(res); //把request里的content转到response
    //pipe capture data 和 end事件， 如触发end，直接返回给客户端
});



/////////////////////////////client events
//1. response
//2. socket: triggered when server allocates socket to client
//3. abort: when client cuts the request (client.abort() for the first time)
//4. aborted: when server cuts the request, and when the request has stopped
//5. continue: when the client receives 100 continue from the server
//6. upgrade: when client requests for upgrading protocol (specify in header 'connection: "upgrade")

//////////////////////////server events
//1. error: server.on("error", function(e){}); //createServer(function)之后用server.on
//2. connect: triggered when the method of the client is connect
//3. connection: triggered when TCP connection established, can be ignored in most cases
//4. request: when Connection: keep-alive is used, multiple requests may correspond to one connection; when not used, request
// is the same as connection
//5. close: close the server, stop receiving new connection. after handling all existing connections, server closes
// and throw event close. When closed normally, callback runs and triggers close event, if closed
//abnormally, callback runs with error as parameter.



///////////////////////HTTPS
//everything stays the same as http for client
var https = require("https");
var fs = require('node basics/module notes/fs');

// for server, to provide HTTPS service, we need HTTPS certificate(if do not already have one, needs to generate one)
var options = {
    key: fs.readFileSync('./cert/chyingp-key.pem'), // 私钥
    cert: fs.readFileSync('./cert/chyingp-cert.pem') // 证书
};
var server = https.createServer(options, function(req, res){
    res.end('这是来自HTTPS服务器的返回');
});
server.listen(3000);

///////////visit websites whose certificate are not trusted

//method 1: set rejectUnauthorized: false
var options = {
    hostname: 'kyfw.12306.cn',
    path: '/otn/leftTicket/init',
    rejectUnauthorized: false  // 忽略安全警告
};

//method 2: add the certificate agency of the website to white list
//1. download CA certificate from the website
//2. convert CA.der to CA.pem: openssl x509 -in srca.cer -inform der -outform pem -out srca.cer.pem
//3. modify node https setting

var ca = fs.readFileSync('./srca.cer.pem');

var options = {
    hostname: 'kyfw.12306.cn',
    path: '/otn/leftTicket/init',
    ca: [ ca ]
};


////////////////////path 处理本地文件路径，构造目录
var path = require("path");
var workDir = path.resolve("."); //construct the full path of the working directory

//construct full path of a file: location + file name
var filePath = path.join(workDir, "name", "file.format");
//every parameter becomes workDir/name/file.format