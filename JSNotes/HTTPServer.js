//http is a module in node js, its return var is an object that
//has access to all the methods of this module
var http = require("http"), url = require("url"),
    formidable = require("formidable"), util = require("util"),
    uuid = require("uuid/v1"), //generate unique id for uploads from clients
    path = require("path"), fs = require("fs");

/*
-without the content inside the createServer()
same as var http = require("http");
var server = http.createServer();
server.listen(8888);
-but then the server would do nothing but listening
-http calls methods createServer which returns an
object that calls listen
-the function itself is a parameter given to the createServer function
-function as parameter can be defined at where parameter is expected, or
being defined separately and then being used as a parameter.

http.createServer(function(request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
}).listen(8888); //the port number the function is listening on
*/

function start(route, handler) {
    //start() is auto-block function, it stops other tasks being run
    //therefore, we try to reduce the use of these functions
    //instead, pass call-back function as parameter to the time-consuming functions
    //so that the main thread can keep dealing with the rest of the code, by saving
    //the callbacks and deal with the rest, call them when the data is available,
    //so the main thread doesnt need to wait for it (node-js uses single thread)
    function onRequest(request, response) {

        if(request.url == '/upload' && request.method.toLowerCase()=="post"){
            //if the request is to upload sth
            //1. create an object of formidable
            var form = formidable.IncomingForm();   //use formidable to parse forms
            //2. create a folder to hold all the uploads from clients, and set up the upload dir
            form.uploadDir = "./upload_dir"; //all the uploaded files can be found here, need to add extension to open
            //3. get the form content
            form.parse(request, function(err, fields, files){
                //process uploaded files
                //1.generate uuid to rename file
                var uid = uuid();
                //2.get file extension
                var ext = path.extname(files.photo.name);
                //3. rename file
                var oldpath = __dirname + "/" + files.photo.path;
                var newpath = __dirname + "/uploads" + uid +ext;
                fs.rename(oldpath, newpath, (err)=>{});

                response.writeHead(200, {'content-type': "text/plain; charset=UTF-8"}); //without charset the written content becomes 乱码
                response.write("received upload:\n\n");
                response.end(util.inspect({fields: fields, files:files})); //convert an object into string for testing
            })
            return;
        }

        //if the request is not upload, but to display a new form
        response.writeHead(200, {'content-type': 'text/html'});
        response.end(
            '<form action="/upload" enctype="multipart/form-data" '+
            'method="post">'+
            '<input type="text" name="title"><br>'+
            '<input type="file" name="upload" multiple="multiple"><br>'+
            '<input type="submit" value="Upload">'+
            '</form>'
        );

        /* static files requests
        4. load file
        fs.readFile(fileUrl, (err, data)=>{
            if(err){
                res.writeHead(404, {content-Type": text/html"});
                res.end("当前资源不存在“）；
            } else {
            //直接创建一个 mime.json文件用拓展名匹配Content-Type,可从网上获得
                fs.readFile("./mime.json", (err, data)=>{
                    let mimeJson = JSON.parse(data);
                    var contentType = mimeJson[ext];
                }
                res.writeHead(200, {"Content-Type": contentType});
                res.end(data); //send the resource requested
            }
        }
        .
         */

    }
    http.createServer(onRequest).listen(8888);
    console.log("server has started.");
}
//convert code into a module to be used in the index.js(similar to main)
exports.start = start;  //use module.exports = start; if the exporting module has no name

/*
oldParseInt.apply(null, arguments);
oldParseInt.call(null, ...arguments);

oldParseInt.apply(null, [1, 2]);
oldParseInt.call(null, 1, 2);

var args = [1, 2];
// oldParseInt.apply(null, [1, 2]);
oldParseInt(args); // oldParseInt(1,2)  oldParseInt([1,2])

*/