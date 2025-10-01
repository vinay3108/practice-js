const myPromiseAllSettled =(promises)=>{
    return new Promise((resolve,reject)=>{
        if(!Array.isArray(promises)){
            reject(new TypeError("Promises should be array"));
        }
        let result = [];
        let completed =0;
        promises.forEach((promise,index)=>{
            Promise.resolve(promise).then((value)=>{
                result[index]={'fulfilled':value};
            }).catch((err)=>{
                result[index]={'rejected':err};
            })
            .finally(()=>{
                completed+=1;
                if(completed==promises.length){
                    resolve(result);
                }
            })
        });
    })
}

const p1 = new Promise((resolve,reject)=>{
    reject("rejected");
})
const p2 = new Promise((resolve,reject)=>{
    resolve(20);
})

myPromiseAllSettled([p1,p2])
.then((res)=>{
    console.log(res);
}).catch((err)=>{
    console.log(err);
})