//parallel API Fetcher

const urls =['https://jsonplaceholder.org/posts','https://jsonplaceholder.org/users','https://jsonplaceholder.org/comments'];
const start = performance.now();
Promise.all([
    fetch(urls[0]).then((res)=>res.json()),
    fetch(urls[1]).then((res)=>res.json()),
    fetch(urls[2]).then((res)=>res.json()),
]).then((res)=>{
    console.log((performance.now()-start)/1000);
    console.log(res);
}).catch((err)=>{
    console.log(err);
})

// let result =[];
// (async()=>{
//    for(let i=0;i<urls.length;i++){
//     const res = await fetch(urls[0]).then((res)=>res.json());
//     result[i]=res;
//    }

//    console.log(result);
//    console.log((performance.now()-start)/1000);
// })();