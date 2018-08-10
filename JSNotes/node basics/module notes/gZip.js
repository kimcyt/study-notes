
var fs = require("node basics/module notes/fs");
var zlib = require("zlib");
var http = require("http");

//gzip 压缩
var gzip = zlib.createGzip();
var inFile = fs.createReadStream("path for the original file");
var out = fs.createWriteStream("path where the compressed file to be saved");
//compress source and then send to the desired location, both use pipe()
inFile.pipe(gzip).pipe(out);

//gzip 解压
var gunzip = zlib.createGunzip();
inFile = fs.createReadStream("the path for the compressed file");
out = fs.createWriteStream("where the uncompressed to be saved");
inFile.pipe(gunzip).pipe(out);
//把infile的stream与gunzip相通，the output of each element is the input of the next.


//服务端gzip压缩

var filePath = "where the requested resource is stored on the server";
var server = http.createServer(function (req, res) {
    var acceptEncoding = req.headers['accept-encoding'];
    var gzip;
    //查看客户端的请求报文是否包含accept-encoding首部且值为gzip.
    //如符合， 返回gzip压缩后的文件
    if(acceptEncoding.indexOf("gzip")!==-1){ //acceptEncoding is a string
        gzip = zlib.createGzip();
        //响应报文 Content-Encoding 告诉浏览器： 文件被压缩过
        res.writeHead(200, {
            "Content-Encoding": "gzip"
        });
        //send the compressed file to response
        fs.createReadStream(filePath).pipe(gzip).pipe(res);
        //if sending response text
        //res.end(zlib.gzipSync(responseText));
    } else{
        fs.createReadStream(filePath).pipe(res);
        //res.end(responseText);
    }
});
server.listen("port");




