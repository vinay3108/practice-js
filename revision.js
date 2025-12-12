// const promiseAll = function(promises){
//     return new Promise((resolve,reject)=>{
//         if(!Array.isArray(promises)){
//             reject(new TypeError("array"));
//         }
//         let result=[];
//         let completed =0;
//         promises.forEach((promise, index)=>{
//             Promise.resolve(promise).then((value)=>{
//                 result[index]=value;
//                 completed++;
//                 if(completed==promises.length){
//                     resolve(result);
//                 }
//             }).catch((err)=>{
//                 reject(err);
//             })
//         })
//     })
// }

// const p1 = new Promise((resolve,reject)=>{
//     setTimeout(()=>{resolve("vinay")},3000);
// })
// const p2 = new Promise((resolve,reject)=>{
//     setTimeout(()=>{resolve("kumaar")},5000);
// })
// const start= performance.now();
// // promiseAll([p1,p2]).then((res)=>{
// //     console.log(res);
// //     console.log(performance.now()-start);
// // }).catch((er)=>{
// //     console.log(er);
// // })


// Function.prototype.customBind = function(thisArg,...bindArgs){
//     if(typeof this !=='function'){
//         return new TypeError('must be function');
//     }
//     let originalFn = this;
//     return function(...callArgs){
//         if(this instanceof originalFn){
//             return new originalFn(...bindArgs,...callArgs);
//         }
//         return originalFn.apply(thisArg,[...bindArgs,...callArgs]);
//     }
// }
// const greet = function (greeting,punctuation){
//     return `${greeting} hello ${this.name} ${punctuation}`;
// }
// const person ={name:'vinay'};

// // const bind = greet.customBind(person,"hello");
// // console.log(bind("!"));

// Function.prototype.myCall = function(thisArg,...args){
//     if(typeof this !=='function'){
//         return new TypeError("vvvv");
//     }
//     thisArg= thisArg??globalThis;
//     const symbol = Symbol();
//     thisArg[symbol]=this;
//     const result = thisArg[symbol](...args);
//     delete thisArg[symbol];
//     return result;
// }

// // console.log(greet.myCall(person,'hello','!!!'));


// Array.prototype.myReduce = function(callback,initialValue){
//     if(typeof callback !=='function'){
//         return new TypeError('');
//     }
//     let arr = this;
//     let startIndex;
//     let accumulator;
//     if(arguments.length>=2){ //we have initialValue
//         accumulator=initialValue;
//         startIndex=0;
//     }else{
//         if(arr.length==0){
//             return new TypeError("array should not be empty");
//         }
//         startIndex=1;
//         accumulator=arr[0];
//     }
//     for(let i=startIndex;i<arr.length;i++){
//         if(i in arr){
//             accumulator=callback(accumulator,arr[i],i,arr);
//         }
//     }
//     return accumulator;
// }

// console.log([1,2,3].myReduce((accumulator,currVal)=> [...accumulator,currVal*2],[]));


const myPromiseAll = function(promises){
    return new Promise((resolve,reject)=>{
        if(!Array.isArray(promises)){
            reject(new TypeError("promises should be array"));
        }
        let result =[];
        let completed=0;
        promises.forEach((promise,index) => {
            Promise.resolve(promise)
            .then((value)=>{
                result[index]=value;
                completed++;
                if(completed==promises.length){
                    resolve(result);
                }
            }).catch((err)=>{
                reject(err);
            })
        });
    })
}
const p1 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        return resolve("vinay");
    },3000)
})
const p2 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        return resolve("kumar");
    },4000)
})
myPromiseAll([p1,p2]).then((res)=>console.log(res));