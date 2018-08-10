///////////////////////////////////////////undone

var crypto = require('node basics/module notes/crypto');
var fs = require('node basics/module notes/fs');
var output;

var content = fs.readFileSync('./test.txt', {encoding: 'utf8'});
//Creates and returns a Hash object that can be used
// to generate hash digests using the given algorithm.
var hash = crypto.createHash('sha256'); //传入不同算法
hash.update(content); //用算法给数据加密，可调用多次， 默认utf8

//encoding可以是hex、latin1或者base64。如果声明了encoding，那么返回字符串。
output = hash.digest('hex');
console.log(output);
// 输出内容为： b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9


/////hmac算法
//只要密钥发生了变化，那么同样的输入数据也会得到不同的签名，
// 因此，可以把Hmac理解为用随机数“增强”的哈希算法。
const hmac = crypto.createHmac('sha256', 'secret-key');
hmac.update('Hello, world!');
hmac.update('Hello, nodejs!');
console.log(hmac.digest('hex')); // 80f7e22570...



///////AES：AES是一种常用的对称加密算法，加解密都用同一个密钥。
// crypto模块提供了AES支持，但是需要自己封装好函数
function aesEncrypt(data, key) {
    const cipher = crypto.createCipher('aes192', key);
    var crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

function aesDecrypt(encrypted, key) {
    const decipher = crypto.createDecipher('aes192', key);
    var decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

