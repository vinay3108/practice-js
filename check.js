// // promise all

const myPromiseAll = (promises) => {
    
    return new Promise((resolve, reject) => {
        if(!Array.isArray(promises)){
            reject(new TypeError("promises should be array"));
        }
        let cnt = 0;
        let result = [];
        promises.forEach((promise, index) => {
            Promise.resolve(promise)
                .then((value) => {
                    result[index] = value;
                    cnt++;
                    if (cnt == promises.length) {
                        resolve(result);
                    }
                })
                .catch((err) => reject(err));
        });
    });
};


// myPromiseAll([
//     new Promise((resolve,reject)=>{setTimeout(()=>{
//         resolve('vinay')
//     },3000)}),
//     new Promise((resolve,reject)=>{setTimeout(()=>{
//         resolve('kumar')
//     },5000)}),
// ])
//     // myPromiseAll([Promise.resolve('vinay'),Promise.resolve('kumar')])
//     .then((res) => console.log(res))
//     .catch((err) => console.log(err));





//my reduce
Array.prototype.myReduce = function(callback,initialValue){
    let accumulator;
    let startIndex=0;
    let originalArr = this;
    if(arguments.length>=2){
        accumulator=initialValue;
        startIndex=0;
    }else{
        if(arguments.length==0){
            return new Error("argument length not be 0");
        }
        accumulator=arguments[0];
        startIndex=1;
    }
    for(let i=startIndex;i<originalArr.length;i++){
        if(i in originalArr){
            accumulator=callback(accumulator,originalArr[i],i,originalArr);
        }
    }
    return accumulator;

}


//flatten
Array.prototype.myFlat = function(depth){
    depth = depth ?? Infinity;
    console.log(depth);
    
    const flatten = (array,depth) =>{
        return array.myReduce((accumulator,value)=>{
            if(Array.isArray(value) && depth>0){
                accumulator.push(...flatten(value,depth-1));
            }else{
                accumulator.push(value);
            }
            return accumulator;
        },[]);
    }
    return flatten(this,depth);
}

// console.log([1,2,3,4,5].myReduce((accumulator,currentValue)=>{return [...accumulator,2*currentValue]},[]));
// console.log([1,[2,[3]]].myFlat(1));
// console.log([1,[2,[3]]].myFlat());


// Array.prototype.myFlat1 = function(depth) {
//     depth = depth ?? Infinity;
//     // console.log(this);
//     const flatten = (array,depth)=>{
//         return array.myReduce((accumulator,value)=>{
//             if(Array.isArray(value) && depth>0){
//                 accumulator.push(...flatten(value,depth-1));
//             }else{
//                 accumulator.push(value);
//             }
//             return accumulator;
//         },[]);
//     }
//     return flatten(this,depth);
// }

// console.log([1,[2,[3]]].myFlat1(1));
// console.log([1,[2,[3]]].myFlat1());


Function.prototype.myCall = function(thisArg,...args){
    if(typeof this!=='function'){
        return new TypeError("this should be function");
    }
    // let originalFn=this;
    thisArg = thisArg ?? globalThis;
    const symbol = Symbol();
    thisArg[symbol]=this;
    const result = thisArg[symbol](...args);
    delete thisArg[symbol];
    return result;

}
Function.prototype.myApply = function(thisArg, args){
    if(typeof this!=='function'){
        return new TypeError("this should be function");
    }
    const symbol = Symbol();
    thisArg[symbol]=this;
    const result = Array.isArray(args) ? thisArg[symbol](...args):thisArg[symbol]();
    delete thisArg[symbol];
    return result;
}

const greet = function (greeting,punctuation) {
    return `${greeting} ${this.name} ${punctuation}`;
}
const person ={name:"vinay"};

// console.log(greet.myCall(person,'hello','!'));

Function.prototype.myBind = function (context,...bindArgs) {
    if(typeof this!=='function'){
        return new TypeError("this should be function");
    }
    let originalFn = this;
    return function(...callArgs){
        if(this instanceof originalFn){
            return new originalFn(...bindArgs,...callArgs);
        }
        return originalFn.myApply(context,[...bindArgs,...callArgs]);
    }
}

// const bind = greet.myBind(person,'hello');
// console.log(bind('ccccccccc'));

function retry(fn,maxCnt){
    return new Promise((resolve,reject)=>{
        function attempt(maxCnt){
            fn()
            .then((res)=>resolve(res))
            .catch((err)=>{
                if(maxCnt==0){
                    reject(err);
                }else{
                    attempt(maxCnt-1);
                }
            });
        }
        attempt(maxCnt);
    })
}


let count=0;
function someTimeFails(){
    return new Promise((resolve,reject)=>{
        count++;
        if(count<3){
            reject('fail'+count);;
        }
        resolve('success ' +count);
    })
}

// retry(someTimeFails,5).then((res)=>console.log(res));