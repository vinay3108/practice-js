const myPromiseAllSettled =(promises)=>{
    return Promise.all(promises.map((p)=>{
        return Promise.resolve(p).then(
            (value)=>({status:"fulfilled",value}),
            (reason)=>({status:"rejected",reason})
        )
    }))
}

myPromiseAllSettled([Promise.resolve("20"),Promise.reject("40")]).then((res)=>{
    console.log(res);
})