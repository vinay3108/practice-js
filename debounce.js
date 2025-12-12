// function debounce(func,timeout=300){
//     let timer;
//     return (...arg)=>{
//         clearTimeout(timer);
//         timer = setTimeout(()=>{func.apply(this,arg)},timeout);
//     }
// }

function debounce(fn,wait){
    let timer;
    return function (...args){
        clearTimeout(timer);
        timer=setTimeout(()=>{fn.apply(this,args)},wait);
    }
}