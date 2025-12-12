// function throttle(fn, delay) {
//     let last = 0;
  
//     return function (...args) {
//       const now = Date.now();
  
//       if (now - last >= delay) {
//         last = now;
//         fn.apply(this, args);
//       }
//     };
//   }
  

// function throttle(func,delay){
//   let last=0;
//   return function(...args){
//     const now = Date.now();
//     if(now-last>=delay){
//       last=now;
//       func.apply(this,args);
//     }
//   }
// }

// function throttle(fn,delay){
//     let last=0;
//     return (...args)=>{
//         const now = Date.now();
//         if(now-last>=delay){
//             fn.apply(this,args);
//         }
//     }
// }
