// function myPromiseAll(promises){
//     return new Promise((resolve,reject)=>{
//         if(!Array.isArray(promises)){
//             return reject(new TypeError("Argument should be Array"));
//         }
//         const result = [];
//         let completed = 0;

//         promises.forEach((promise,index)=>{
//             Promise.resolve(promise).then((value)=>{
//                 result[index]=value;
//                 completed+=1;
//                 if(completed==promises.length){
//                     resolve(result);
//                 }
//             }).catch((err)=>{
//                 reject(err);
//             });
//         })
//         if(promises.length==0) return resolve([]);
//     })
// }

// const p1 = Promise.resolve(10);
// const p2 = new Promise((res)=>setTimeout(()=>res(20),100));
// const p3 = 30;

// myPromiseAll([p1,p2,p3])
// .then((results)=>console.log('resolved',results))
// .catch((err)=>console.log(err));



const myPromiseAll =(promises)=>{
    if(!Array.isArray(promises)){
        return new TypeError("Promises should be array");
    }

    return new Promise((resolve,reject)=>{
        let result =[];
        let completed=0;
        promises.forEach((promise,index)=>{
            Promise.resolve(promise)
            .then((value)=>{
                result[index]=value;
                completed+=1;
                if(completed==promises.length){
                    resolve(result);
                }
            }).catch((err)=>{
                reject(err);
            })
        })
    })
}

const start = performance.now();
const p1 = new Promise((resolve,reject)=>setTimeout(()=>{resolve(20)},2000));
const p2 = new Promise((resolve,reject)=>setTimeout(()=>{resolve(40)},5000));
myPromiseAll([p1,p2])
.then((res)=>{
    console.log(res)
    console.log(performance.now()-start);
})
.catch((err)=>{ console.log(err)})

