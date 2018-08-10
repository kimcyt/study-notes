// //
// // function delay2s (callback) {
// //     setTimeout(callback, 2000)
// // }
// //
// // function delay3s (callback) {
// //     setTimeout(callback, 3000)
// // }
// //
// // delay2s(function () {
// //     console.log('after 2s');
// // });
// // // const fn = function () {
// // // //     console.log('exec after 2s');
// // // // };
// // // // delay2s(fn);
// //
// // // delay2s(function () {
// // //     console.log('after 2s');
// // //     delay3s(function () {
// // //         console.log('after 3s');
// //
// // //     });
// // // });
// //
// // // console.log('now pending');
// // // const fn = function () {
// // //     console.log('after 2s');
// // //     resolve('result');
// // // };
// // // delay2s(fn);
// //
// //
// // // const pr = new Promise(function (resolve, reject) {
// // //     delay2s(function () {
// // //         // reject(1);
// // //     })
// // // });
// // //
// // // pr.then(function (result) {
// // //     console.log('get resolved: ', result);
// // // });
// // //
// // // pr.catch(function (error) {
// // //     console.log('get error: ', error);
// // // });
// //
// //
// // function delay (delay) {
// //     return new Promise (function (resolve, reject) {
// //         setTimeout(resolve, delay);
// //     })
// // }
// //
// // delay(2000)
// //     .then(function () {
// //         console.log('after 2s');
// //
// //         return delay(3000);
// //     })
// //     .then(function () {
// //         throw new Error()
// //         console.log('after 3s');
// //     })
// //     .catch(function (error) {
// //         console.log('error: ', error);
// //     });
//
// // const p1 = new Promise(function (resolve, reject) {
// //     setTimeout(() => reject(new Error('fail')), 1000)
// // })
// //
// // const p2 = new Promise(function (resolve, reject) {
// //     setTimeout(() => resolve(p1), 3000)
// // })
// //
// // p2
// //     .then(result => console.log(result))
// //     .catch(error => console.log(error))
//
//
// function Fun (name) {
//     this.name = name;
//     Fun.count += 1;
// }
// Fun.count = 0;
//
// Fun.prototype.getMyName = function () {
//     console.log(this.name);
//     return this.name;
// };
//
// Fun.dosth = function () {
//     console.log('dosth');
// };
//
// const instance = new Fun('lily');
// instance.getMyName();
//
//
// Fun.dosth();
//
//
// function getFoo () {
//     return new Promise(function (resolve, reject){
//         resolve('foo');
//     });
// }
//
// const g = function* () {
//     try {
//         const foo = yield getFoo();
//         console.log(foo);
//     } catch (e) {
//         console.log(e);
//     }
// };
//
// function run (generator) {
//     const it = generator();
//
//     function go(result) {
//         if (result.done) return result.value;
//
//         return result.value.then(function (value) {
//             return go(it.next(value));
//         }, function (error) {
//             return go(it.throw(error));
//         });
//     }
//
//     go(it.next());
// }
//
// run(g);
//
// textPromises.reduce(
//     (chain, textPromise) => {
//     return chain.then(() => textPromise)
//         .then(text => console.log(text));
//     }, Promise.resolve()
// );
//
// function indexOf(arr, item) {
//     for(let i=0; i<arr.length;i++){
//         if(arr[i]===item){
//             return i;
//         }
//     }
//     return -1;
// }
//
// console.log(indexOf([1,2,3,4,5], 4));
//
//
// function remove(arr, item) {
//     return arr.map(function(x){
//         if(x!==item){
//             return x;
//         }
//     })
// }
//
// function remove(arr, item) {
//     var newArr = [];
//     for(var i=0; i<newArr.length; i++){
//         if(arr[i]!==item){
//             newArr.push(arr[i]);
//         }
//     }
//     return newArr;
// }
//
// console.log(removeWithoutCopy([3,45,2,6,6], 6));
//
// function removeWithoutCopy(arr, item) {
//     var index  = 0;
//     while(index !==-1){
//         index = arr.indexOf(item);
//         arr.splice(index, 1);
//     }
//     return arr;
//
// }
//
// function truncate(arr) {
//     arr.pop();
//     return arr.map(function(x){return x});
// }
// console.log(truncate([3,4,5,6,7]));
//
// function duplicates(arr) {
//
//     var result = arr.filter(function (x, index){
//         //find the repeated elements
//         if(arr.indexOf(x)!==index){
//             return x;
//         }
//     })
//     return result;
// }
//
// console.log(duplicates([1, 2, 4, 4, 3, 3, 1, 5, 3]));
// function parse2Int(num) {
//     var arr = num.split(",");
//     console.log(arr);
//     if(arr.indexOf("x")!=-1){
//         arr.splice(arr.indexOf("x"), 1);
//         console.log(arr);
//     }
//     return parseInt(arr.join());
// }
// console.log(parse2Int("0x12"));
//
// function functionFunction(str) {
//     return function(word){
//         console.log(str + ", " + word);
//     }
// }
// console.log(functionFunction("hello")("world"));

// function makeClosures(arr, fn) {
//     var result = [];
//     for(var i=0; i<arr.length; i++){
//         function closure (val) {
//             result[i] = function(){
//                 return fn(val);
//             }
//         }
//         closure(arr[i]);
//     }
//     return result;
// }
//
// var result = makeClosures([1,2,3], function (x) {
//     return x;
// });
// console.log(result[2]());

// function useArguments(...rest) {
//     return rest.reduce(function(x,y){
//         return x+y;
//     })
// }
//
// console.log(useArguments(1,2,3,4))

// (function(){
//     console.log( Array.from(arguments).slice(1));
// })(1,2,3,4,5,6);   //convert arguments to an array to use the slice method
//
// (function(){
//     console.log( [].slice.call(arguments, 1));
// })(1,2,3,4,5,6);
// //equals to arguments.slice, but since arguments is not an array and does
// //not have access to slice(), must use call to run it
//
// function partialUsingArguments(fn) {
//     var args = Array.from(arguments).slice(1);
//     return result = function(){
//         return fn.apply(null, args.concat(Array.from(arguments)));
//     }
// }
//
// function valueAtBit(num, bit) {
//     var pos = 1;
//     while(pos < bit){
//         num = Math.floor(num/2);
//         pos++;
//         console.log(num);
//     }
//     if(num%2===0){
//         return 0;
//     }
//     return 1;
// }
//
// function captureThreeNumbers(str) {
//     arr =  /(\d{3})/.exec(str);
//     if(arr[1]){
//         return arr[1];
//     }
//     else{
//         return false;
//     }
// }

//extract attributes from an url
// function getUrlParam(sUrl, sKey) {
//     var result = {};
//     var reg = /(\w+)=(\w+)&?/g;
//     sUrl.replace(reg, function(a, k, v){
//         if(!result[k]) //if new key-value
//             result[k] = v;
//         else { //if repeated key
//             result[k]=[].concat(result[k],v);
//         }
//     });
//
//     if(sKey){//if no para
//         return result[sKey] || "";
//     }else{
//         return result;
//     }
// }
//
// var url = "https://www.google.com.hk/search?newwindow=1&safe=strict&safe=nw0aW8n6N4K70AT-9JHYAg&q=function.length&oq=function.le&gs_l=psy-ab.3.0.0l3j0i30k1l7.13041612.13045514.0.13047032.16.15.1.0.0.0.218.1367.10j3j1.14.0..3..0...1.1j4.64.psy-ab..3.13.1068...0i67k1j0i10k1j0i12k1.0.6sJZyAz8Dkw";
// console.log(getUrlParam(url));

function namespace(oNamespace, sPackage) {
    var obj = oNamespace;
    sPackage.replace(/(\w+)\.?/g, function(a,path){
        console.log(path);
        if(!obj[path] || typeof obj[path] !== "object"){
            obj[path] = {};
        }
        obj = obj[path];
        console.log(oNamespace);
    })
    return oNamespace;
}
//var result = namespace({a: {test: 1, b: 2}}, 'a.b.c.f.t');
//console.log(JSON.stringify(result));

Array.prototype.uniq = function () {
    var self = this;
    return this.filter(function(e, i){
        return self.indexOf(e) === i;
    })
};

function cssStyle2DomStyle(sName) {
    return sName.replace(/(\-)(\w)(\w+)/g, function(s, remv, cap, low){
        return cap.toUpperCase() + low;
    }).replace(/\-/g, "");
}

function digPow(num, start){
    var length = num.toString().length,
         arr = num.toString().split(""),
         index=0, sum=0;

    while(index<length) {
        sum += Math.pow(parseInt(arr[index]), start);
        start++;
        index++;
    }
    return  sum%num === 0 ?  sum/num : -1;   //shorthand for boolean
}

//console.log(digPow(46288, 3));

function removeSmallest(numbers) {
    //throw "TODO: removeSmallest";
    var min = numbers[0],
        result = [];
    for(let num of numbers){
        min = num<min? min = num:min;
        result.push(num);
    }
    result.splice(result.indexOf(min), 1);
    return result;
}

console.log(removeSmallest([32,5,6,3,4,5,3]));