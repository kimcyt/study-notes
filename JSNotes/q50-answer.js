//1. 写出以下代码的执行结果
var myObject = {
    foo: "bar",
    func: function() {
        var self = this;
        console.log(this.foo);
        console.log(self.foo);
        (function() {
            console.log(this.foo);
            console.log(self.foo);
        }());
    }
};
myObject.func();

/*
bar
bar
undefined       //////function 的function 里面的this指向最外层
bar
 */


//2.写出以下代码的执行结果
var a = 1;
function fn(){
    console.log(a);
    var a = 5;
    console.log(a);
    a++;
    var a;
    fn2();
    console.log(a);
    function fn2(){
        console.log(a);
        a = 20;
        b = 100;
    }
}
fn();
/*
undefined ///variable declaration 提升到最上方，赋值不提升
var a;
console.log(a);
a = 5 ....
5
6
 */
console.log(a); //1
a = 10;
console.log(a); //10
console.log(b); //100  ///////if variable undeclared, by default global.b = 100


//3.写出以下代码的执行结果
var name = 'World!';
(function () {
    var name;
    if (typeof name === 'undefined') {
        name = 'Jack';
        console.log('Goodbye ' + name);
    } else {
        console.log('Hello ' + name);
    }
})();

/*
Goodbye  Jack
 */


//4.写出以下代码的执行结果
function swap(x, y){
    var temp = x;   // temp => 1, obj1 => 1, x => 1
    x = y;          // x => 2 , obj2 => 2, y => 2
    y = temp;       // y => 1, obj1 => 1, temp => 1
}

var a = 1;
var b = 2;
swap(a, b);
console.log(a);   //1
console.log(b);   //2

var obj1 = {name: 'jirengu'};
var obj2 = {age: 2};
swap(obj1, obj2);
console.log(obj1);  //{name: 'jirengu'}
console.log(obj2);  //{age:2}
//did not swap, only pass references to x,y ==> having two more variables pointing
//to the objects, but they can not affect obj1, obj2


//5.写出以下代码的执行结果
const first = () => (new Promise((resolve,reject)=>{
    console.log(3);
    let p = new Promise((resolve, reject)=>{
        console.log(7);
        setTimeout(()=>{
            console.log(5);
            resolve(6);
        },0);
        resolve(1);
    });
    resolve(2);
    p.then((arg)=>{
        console.log(arg);
    });
}));

first().then((arg)=>{
    console.log(arg);
});
console.log(4);

/*
3
7
4
1
2
5
everything in the promise is 同步, 不管有多少层promise, run first,
setTimeOut is 异步, 最后发生
 */

//6. 写出以下代码的执行结果
Promise.resolve(1)
    .then((x) => x + 1)
    .then((x) => { throw new Error('My Error') })
    .catch(() => 1)
    .then((x) => x + 1)
    .then(console.log, console.log);

//2



//7.写一个 sum方法，在使用下面任一语法调用时，都可以正常工作
console.log(sum(2,3));   // Outputs 5
console.log(sum(2)(3));  // Outputs 5

function sum (a, b) {
    if (typeof b !== 'undefined') {
        return a + b;
    } else {
        return function (b) {
            return a + b;
        } ///the function returned will take argv b from outside, with a value fixed
    }
}


//8.写出以下代码的执行结果
Promise.resolve(1).then(2).then(console.log);
//1
//then(2)里面不是一个function， 直接穿透

//9.写出以下代码的返回结果
    [undefined, null, 1, '1', [], {}, () => {}].map(v => typeof v);

    /*
    [undefined, object, number, string, object, object, function]
     */


//10.写出以下代码的执行结果
function showCase(value) {
    switch(value) { // ===
        case 'A':
            console.log('Case A');
            break;
        case 'B':
            console.log('Case B');
            break;
        case undefined:
            console.log('undefined');
            break;
        default:
            console.log('Do not know!');
    }
}
showCase(new String('A'));  //object string
/*
Do not know!
the input is object, switch use === to check the value to match option, so
'A' is different from String("A");
 */


//11. 写出以下代码的执行结果
console.info('5' + 3)  //"53"   //plus sign mean concat string
console.info('5' - 3)  //2    //no plus, convert string to num


//12. 写出以下代码的执行结果
// this
const adder = {
    sum: 0,
    add: function (numbers) {
        numbers.forEach(n => {
            this.sum += n;
        });
    }
};
adder.add([1,2,3]);
console.log(adder.sum);  //0
/*
for the arrow function inside a function of an object, this points to sth else
so sum unchanged
 */


//13.写出以下代码的执行结果
var a = [];
a['x'] = 'y';
console.log(a.length);   //1
a['13'] = 42;
console.log(a.length);  //2
/*
Array is actually an object, so it will store non-number keys like what objects do
but if the key can be converted to number, it will become index, and expand the
array according if the array is null
 */

//14.写出以下代码的执行结果
console.log(new Array(3).length, new Array(3,3,3).length);
//3,3
/*
if more than one params are provided, it becomes the elements of the new array,
otherwise, it sets the length of the array
 */


//15.出以下代码的执行结果
console.log([] === [], [] == []);
//false, true
/*
for ==, if both sides are objects, it does not convert any of them, and
performs as ===
 */

//16.写出以下代码的执行结果
console.log(1 && 2 || 0); //2
console.log(0 || 2 && 1);  //1
console.log(0 && 2 || 1); //1
/*
&& has priority over ||, and if the left hand side of || is true, return left,
otherwise, return  right.
 */

//17.写出以下代码的执行结果
(function(x) {
    (function(y) {
        console.log(x, y);
    })(2)
})(1);

//1,2


//18.实现一个函数removeSmallest，用于去除整数数组的最小项，使得
// removeSmallest([1,2,3,4,5]) => [2,3,4,5]
// removeSmallest([5,3,2,1,4]) => [5,3,2,4]
// removeSmallest([2,2,1,2,1]) => [2,2,2,1]
// removeSmallest([]) => []
// 要求:
//     返回新的数组，不修改原来数组
// 如果有多个最小项，只去掉第一项
// 不修改原来数组顺序

function removeSmallest(numbers) {
    let indexOfMin = numbers.indexOf(Math.min(...numbers));
    return [...numbers.slice(0, indexOfMin), ...numbers.slice(indexOfMin + 1)];
}

function removeSmallest(list) {
    let arr = Array.from(list),
        min = arr[0],
        index = 0;
    for (let i=1; i<arr.length; i++){
        if(arr[i]<min){
            min = arr[i];
            index = i;
        }
    }
    arr.splice(i, 1);
    return arr;
}


//19.写出以下代码的执行结果
var arr = ['a', 'b'];
delete arr[1];
console.log(arr.length);
/*
2
delete can remove the element, but it cannot alter the length of the array
the length of the array cannot be shortened in most cases
 */


//20.写出以下代码的执行结果
function foo(){
    this.a = 1;
    //在用new的情况下
    return foo;
    //1 不返回(没有return) 或者 返回原始类型的情况下
    //返回 this ==》 这个构造函数构造的实例
    // 2. 如果返回一个引用类型，就真的返回return的东东
}
const x = new foo();
console.log(x);
console.log(new foo() instanceof foo);
/*
这个是情况2，return的是构造函数本身， 不是实例
 */


//21.写出以下代码的执行结果
function Fun () {
    this.x = 1;
}
Fun.prototype.y = 1;
const a = new Fun();
const b = new Fun();
a.x = 2;
a.y = 2;
console.log(b.x, b.y);  //1,1
Fun.prototype.y = 3;
console.log(b.x, b.y);  //1,3
for (let key in b) {
    if (b.hasOwnProperty(key)) {
    }
    console.log(key);
}
/*
放在构造函数里的属性是实例自己的属性， 但是遍历实例属性时可以看到它
prototype定义的属性， 用hasOwnProperty去check是否真实自己存在的属性
 */


//22.写出以下代码的执行结果
var bar = true;
console.log(bar + 0);  //1
console.log(bar + "xyz"); //"truexyz"
console.log(bar + true); //2  全部转换为1


//23.写出以下代码的执行结果
var Employee = {
    company: 'xyz'
}
var emp1 = Object.create(Employee);
delete emp1.company;
console.log(emp1.company);
/*
xyz
虽然实例的属性被delete掉，它构造函数还是会有
 */


//24.写出以下代码的执行结果
const arr = [1, 2];
console.log(arr.splice(0, arr.length));
//[1,2]


//25.写出以下代码的执行结果
let obj = { a: 1};
function fn() {
    this.b = 100;
    return this.a;
}
let fe = fn.bind(obj);
console.log(obj, fe());

//{a:1, b:100}, 1  先全部执行再传入值到function


