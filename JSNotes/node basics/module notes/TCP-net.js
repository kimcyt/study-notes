var net = require('net');

var PORT = 3000;
var HOST = '127.0.0.1';

// tcp服务端
var server = net.createServer(function(socket){
    //the callback runs when a request is received, because it is equal to server.on("connect"..)
    console.log('服务端：收到来自客户端的请求');3
    socket.on('data', function(data){
        console.log('服务端：收到客户端数据，内容为{'+ data +'}');4
        // 给客户端返回数据
        socket.write('你好，我是服务端');
    });
    socket.on('close', function(){ //收到client的end（）时触发
        console.log('服务端：客户端连接断开');6
    });
});
server.listen(PORT, HOST, function(){ //1. 先执行同步
    console.log('服务端：开始监听来自客户端的请求');1
});

// tcp客户端
var client = net.createConnection(PORT, HOST);
//once the server starts to listen, connect is triggered
client.on('connect', function(){
    console.log('客户端：已经与服务端建立连接');2
});
client.on('data', function(data){
    console.log('客户端：收到服务端数据，内容为{'+ data +'}');5
});
client.on('close', function(data){
    console.log('客户端：连接断开');7
});
client.end('你好，我是客户端'); //先于callback执行, 但是发送需要时间，所以callback先print了

