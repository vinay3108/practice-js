
//Write delay(ms, value) that returns a promise resolved with value after ms
function customDelay(ms,value){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>resolve(value),ms);
    })
}

// customDelay(5000,"vinay").then(console.log);


// Write runInSequence([fn1, fn2, fn3]) where each function returns a promise, and you run them one after the other.

//run in once parallel
// const runInSequence = function (fns) {
//     return new Promise((resolve,reject)=>{
//         let result= [];
//         let completed =0;
//         fns.forEach((fn,index)=>{
//             Promise.resolve(fn)
//             .then((res)=>{
//                 result[index]=res;
//                 completed++;
//                 if(fns.length==completed){
//                     resolve(result);
//                 }
//             })
//         })
//     })
// }


//Sequential
// function runInSequence (fns) {
//     return fns.reduce((previous, fn) => {
//         return previous.then(results=>
//             fn().then(res=>[...results,res])
//         )
//     },Promise.resolve([]));
// }

function runInSequence(promises){
  return promises.reduce((acc, currentFn) => {
      return acc.then((result)=>{
        return currentFn().then((val)=>[...result,val]);
      })
  }, Promise.resolve([]));
}


// runInSequence([()=>customDelay(3000,"1"),()=>customDelay(1000,"2"),()=>customDelay(4000,"3")]).then(console.log);


//Implement retry(fn, retries) that retries a promise-returning function until it succeeds or retries run out.
//*************wrong************************
// function retry(fn,retries) {
//     console.log("here");
//     return new Promise((resolve,reject)=>{
//         let curr=0;
//         Promise.resolve((fn)=>{
//             if(curr==retries){
//                 resolve(fn);
//             }
//             reject(fn);
//         }).catch((err)=>{
//             console.log("errr");
//             if(curr<retries){
//                 this(fn());
//             }
//         })
//     })
// }
//*********************************** */

// correct

function retry(fn, retries) {
    return new Promise((resolve, reject) => {
      function attempt(remaining) {
        fn()
          .then(resolve)
          .catch(err => {
            if (remaining === 0) {
              reject(err);
            } else {
              attempt(remaining - 1);
            }
          });
      }
      attempt(retries);
    });
  }


let count = 0;
function sometimesFails() {
  return new Promise((resolve, reject) => {
    count++;
    if (count < 3) reject("fail " + count);
    else resolve("success " + count);
  });
}

// retry(sometimesFails, 5)
//   .then(console.log)  // "success 3"
//   .catch(console.error);

// obj={
//   to:['a','b','b'],
//   cc:['a','b','c'],
//   bcc:['d','e','f','a']
// }


// const simplify = (obj) => {

//   const set = new Set()

//   const res = {}

//   Object.keys(obj).map((key) => {

//     let arr = []

//     obj[key].map((val) => {
//       if(!set.has(val)){
//         set.add(val)
//         arr.push(val)
//       }
//     })

//     res[key] = [...arr]
//   })

//   return res
// }

// console.log(simplify(obj))

// Online Javascript Editor for free
// Write, Edit and Run your Javascript code using JS Online Compiler
