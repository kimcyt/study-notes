var arr = new Array();
for(let i =1;i<5;i++) {
    arr[i] = i;
    //[<empty item>, 1,2,3,4]
}
console.log(arr);
arr=arr.map((i)=> i+1);//arr: [<empty item>, 2,3,4,5]
console.log(arr);
arr=arr.filter((i)=>i>3);//arr: [4,5]
console.log(arr);
arr=[1,2,3].concat(arr);//arr: [1,2,3, 4, 5]
console.log(arr);
arr=arr.reduce((p,c)=>p+c);//arr: 15
console.log(arr);
var map = new Map();
map.set("hello","world");
map.set("hi","nodejs");
//补充遍历方法依次输出hello world hi nodejs
for(let [key, value] of map) {
    console.log(key);
    console.log(map.get(key));
}

console.log([...map.entries()], [...map.keys()], [...map.values()]);

"use strict";
var num1=1, str="helloworld";
let num2=2;
const tmp="5", obj={};
console.log(num1++); //输出:   1
console.log((++num1+num2) ===tmp); //结果:   false
console.log((num1-num2) ==true); //结果:         true
console.log(str.replace('o','')); //输出:   hellworld
str.substring(3, 6); //str:  helloworld
console.log(str);
obj[str]=tmp;//obj:
console.log(obj);//           {helloworld: "5"}
// tmp=obj;//tmp:            //error, cannot assign

