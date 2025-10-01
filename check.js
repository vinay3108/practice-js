// // promise all

// const myPromiseAll = (promises) => {
    
//     return new Promise((resolve, reject) => {
//         if(!Array.isArray(promises)){
//             reject(new TypeError("promises should be array"));
//         }
//         let cnt = 0;
//         let result = [];
//         promises.forEach((promise, index) => {
//             Promise.resolve(promise)
//                 .then((value) => {
//                     result[index] = value;
//                     cnt++;
//                     if (cnt == promises.length) {
//                         resolve(result);
//                     }
//                 })
//                 .catch((err) => reject(err));
//         });
//     });
// };


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



