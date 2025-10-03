const promiseAll = function(promises){
    return new Promise((resolve,reject)=>{
        if(!Array.isArray(promises)){
            reject(new TypeError("array"));
        }
        let result=[];
        let completed =0;
        promises.forEach((promise, index)=>{
            Promise.resolve(promise).then((value)=>{
                result[index]=value;
                completed++;
                if(completed==promises.length){
                    resolve(result);
                }
            }).catch((err)=>{
                reject(err);
            })
        })
    })
}

const p1 = new Promise((resolve,reject)=>{
    setTimeout(()=>{resolve("vinay")},3000);
})
const p2 = new Promise((resolve,reject)=>{
    setTimeout(()=>{resolve("kumaar")},5000);
})
const start= performance.now();
// promiseAll([p1,p2]).then((res)=>{
//     console.log(res);
//     console.log(performance.now()-start);
// }).catch((er)=>{
//     console.log(er);
// })


Function.prototype.customBind = function(thisArg,...bindArgs){
    if(typeof this !=='function'){
        return new TypeError('must be function');
    }
    let originalFn = this;
    return function(...callArgs){
        if(this instanceof originalFn){
            return new originalFn(...bindArgs,...callArgs);
        }
        return originalFn.apply(thisArg,[...bindArgs,...callArgs]);
    }
}
const greet = function (greeting,punctuation){
    return `${greeting} hello ${this.name} ${punctuation}`;
}
const person ={name:'vinay'};

// const bind = greet.customBind(person,"hello");
// console.log(bind("!"));

Function.prototype.myCall = function(thisArg,...args){
    if(typeof this !=='function'){
        return new TypeError("vvvv");
    }
    thisArg= thisArg??globalThis;
    const symbol = Symbol();
    thisArg[symbol]=this;
    const result = thisArg[symbol](...args);
    delete thisArg[symbol];
    return result;
}

console.log(greet.myCall(person,'hello','!!!'));