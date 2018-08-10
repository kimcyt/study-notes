/*
Readable：用来读取数据，比如 fs.createReadStream()。
Writable：用来写数据，比如 fs.createWriteStream()。
Duplex：可读+可写，比如 net.Socket()。
Transform：在读写的过程中，可以对数据进行修改，比如 zlib.createDeflate()（数据压缩/解压）。
 */

//文件读取
var fs = require("node basics/module notes/fs");
var data;

//普通读取
//同步读取
try{
    data = fs.readFileSync("path", "编码");
} catch (e) {}

//异步读取
fs.readFile("path", "utf8", function(err, data){
    if(err){}
    //manipulate the data
})


//通过文件流读取，适合大文件
var readStream = fs.createReadStream("path", "utf8");
readStream
    .on("data", function (chunk) {})
    .on("error", function (err) {})
    .on("end", function () {}) //没有数据了
    .on("close", function(){}) //已经关闭，不再有事件抛出



//文件写入：如文件存在，覆盖文件, 与读取的流程一样

fs.writeFile();//异步
fs.writeFileSync();//同步
//通过文件流写入
var writeStream = fs.createWriteStream("destination", "编码");
writeStream.on("close", function () {});
writeStream.write("content to be written"); //call multiple write() keep writing until finished
//可写入buffer, 这样createWriteStream的时候就不用提供编码
writeStream.write(new Buffer("二进制数据", "编码"));
writeStream.write("END.")
writeStream.end(""); //finish writing



//判断文件是否存在, access 还可判断文件权限
fs.access("file path", function (err) {
    //if no err, means file exists
})


//文件目录操作

//创建目录
fs.mkdir("dir", function (err) { //异步
    if(err) throw err;
});
fs.mkdirSync("dir"); //同步，用try catch
//删除文件
fs.unlink("dir", function (err) {});
fs.unlinkSync();
//文件重命名
fs.rename();

//遍历目录： 如果是目录，需要递归
var path = require("path");
var getFilesInDir = function(dir){
    var results = [ path.resolve(dir) ];//construct and return an absolute path
    var files = fs.readdirSync(dir, 'utf8'); //只会读一层

    files.forEach(function(file){
        file = path.resolve(dir, file);
        var stats = fs.statSync(file);  //return a fs.stats object
        if(stats.isFile()){
            results.push(file);
        }else if(stats.isDirectory()){
            results = results.concat( getFilesInDir(file) );
        }
    });
    return results;
};


////////////////////////////////////pipe
//readable stream 和 writable stream 串联起来后， 所有数据直接从readable进入writable.
var rs = fs.createReadStream('sample.txt');
var ws = fs.createWriteStream('copied.txt');
rs.pipe(ws); //复制了源文件sample
//读取sample完毕后， end event 自动触发并关闭writable stream，
//如果不希望关闭：
readable.pipe(ws, {end:false});
