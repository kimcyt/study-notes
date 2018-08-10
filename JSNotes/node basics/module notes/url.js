//parse(urlString)：将url字符串，解析成object，便于开发者进行操作。
/*
parseQueryString：（默认为false）如为false，则urlObject.query为未解析的字符串，
比如nick=%E7%A8%8B%E5%BA%8F%E7%8C%BF%E5%B0%8F%E5%8D%A1，且对应的值不会decode；
如果parseQueryString为true，则urlObject.query为object，比如{ nick: '程序猿小卡' }，
且值会被decode；
slashesDenoteHos：（默认为false）如果为true，那么类似//foo/bar里的foo就会被认为是hostname；
如果为false，则foo被认为是pathname的一部分。
 */

//format(urlObj)：.parse() 方法的反向操作。//
//resolve(from, to)：以from作为起始地址，解析出完整的目标地址（还是看直接看例子好些）
// url.resolve('/one/two/three', 'four')         // '/one/two/four'
// url.resolve('http://example.com/', '/one')    // 'http://example.com/one'
// url.resolve('http://example.com/one', '/two') // 'http://example.com/two'


///////////////////////////////////////////////querystring
//parse()：对url查询参数（字符串）进行解析，生成易于分析的json格式。
// stringif()：跟**.parse()**相反，用于拼接查询查询。convert obj to string
var querystring = require('querystring');
var str = 'nick=casper&age=24';
var obj = querystring.parse(str); //extract the properties and put into an obj
console.log(JSON.stringify(obj, "substitude for :" , "substitude for &")); //
/*
{
    "nick": "casper",
    "age": "24"
}
 */
