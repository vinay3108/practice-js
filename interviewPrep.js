// const obj={ a: { b: { c: 2 } } }
// function flat(obj,parent="",res={}){
//     for (let key in obj){
//         const newKey = parent ? parent+"."+key:key;
//         if(typeof obj[key] === "object" && obj[key]!==null){
//             return flat(obj[key],newKey,res);
//         }
//         else{
//             res[newKey]=obj[key];
//         }

//     }
//     return res;
// }

// console.log(flat(obj));

// var x = 5;
// function x() {}
// console.log(typeof x);
// console.log(fn);
// var fn = 10;
// function fn() {}


// function blockEventLoop(){
//     while(1){
        
//     }
//     console.log("vvvvv");
// }

// blockEventLoop();


// async function foo(){
//     console.log(1);
//     await Promise.resolve();
//     console.log(2);
// }
// console.log(3);
// setTimeout(()=>{console.log(4),0});
// foo();
// console.log(5);
// Promise.resolve().then(()=>console.log(6));