//UDP是无连接的，不保障数据的可靠性，不过它的编程更为简单，有时候我们也需要它。
// 比如做APP的统计或者日志或者流媒体.
//使用UDP，如果你要发送数据，只需要知道对方的主机名（地址）和端口号，扔一消息过去即可。
// 至于对方收不收得到，听天由命了。这就是数据报服务，类似快递或邮件。
var PORT = 33333;
var HOST = '127.0.0.1';
var dgram = require('dgram');

////////////////////单播； 数据报只能被指定的ip接收，同一子网下的其它主机都不会接收该数据报。
// 例子：UDP服务端
var server = dgram.createSocket('udp4');

server.on('listening', function () { //socket 正在监听这个ip
    var address = server.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
});
server.on('message', function (message, remote) {
    console.log(remote.address + ':' + remote.port +' - ' + message);
});
server.bind(PORT, HOST);

// 例子：UDP客户端
var message = Buffer.from('My KungFu is Good!');

var client = dgram.createSocket('udp4');

client.send(message, PORT, HOST, function(err, bytes) {
    if (err) throw err;
    console.log('UDP message sent to ' + HOST +':'+ PORT);
    client.close();
});


////////////////。广播：该广播网络下的所有主机都会受到影响，主机根据端口号来判断是否丢弃该数据。
port = 33333;
server = dgram.createSocket('udp4');
server.on('message', function(message, rinfo){
    console.log('server got message from: ' + rinfo.address + ':' + rinfo.port);
});
server.bind(port);

//接着创建客户端，向地址'255.255.255.255:33333'进行广播。
var client = dgram.createSocket('udp4');
var msg = Buffer.from('hello world');
var host = '255.255.255.255';

// If port is not specified or is 0, the operating system will attempt to bind
// to a random port. If address is not specified, the operating system will attempt to
// listen on all addresses. Once binding is complete, a 'listening' event is emitted and
// the optional callback function is called.
client.bind(function(){
    //When set to true, UDP packets may be sent to a local interface's broadcast address.
    client.setBroadcast(true);
    client.send(msg, port, host, function(err){
        if(err) throw err;
        console.log('msg has been sent');
        client.close();
    });
});