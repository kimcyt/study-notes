//create buffer
var buf = Buffer.alloc(10); //长度为10， 初始值为0x0
buf = Buffer.alloc(10, 1); //初始值为0x1

buf = Buffer.from([1,2,3]);  长度为3的buffer，初始值为 0x01, 0x02, 0x03
buf = Buffer.from('this is a tést');  // 默认采用utf8
console.log(buf.toString());//默认采用utf8， 如使用编码与buffer不符， 会返回乱码

buff = Buffer.from('buffer');
buff2 = Buffer.from(buff); //buff2 是buff的copy


/*
string：写入的字符串。
offset：从buf的第几位开始写入，默认是0。
length：写入多少个字节，默认是 buf.length - offset。
encoding：字符串的编码，默认是utf8。
 */
//buf.write(string[, offset[, length]][, encoding])

//buf.fill(value[, offset[, end]][, encoding]);
var buff = Buffer.alloc(20).fill('a');

console.log(buff.toString());  // aaaaaaaaaaaaaaaaaaaa

var buff = Buffer.from('hello');

console.log( buff.toJSON() );  // { type: 'Buffer', data: [ 104, 101, 108, 108, 111 ] }


//遍历
var buff = Buffer.from('abcde');

for(const key of buff.keys()){ //output index
    console.log('key is %d', key);
}

for(const value of buff.values()){ //output values
    console.log('value is %d', value);
}
// value is 97
// value is 98
// value is 99
// value is 100
// value is 101

for(const pair of buff.entries()){ //output key:value pairs
    console.log('buff[%d] === %d', pair[0], pair[1]);
}
