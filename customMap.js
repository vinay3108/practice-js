// Array.prototype.myMap = function (callback,thisArg){
//     console.log(callback,thisArg);
//     if(typeof callback !== 'function'){
//         throw new TypeError("callback should be function");
//     }

//     let result = [];
//     let arr = this;
//     console.log(arr.length);
//     for(let i=0;i<arr.length;i++){
//         if(i in arr){
//             result.push(callback.call(thisArg,arr[i],i,arr));
//         }
//     }
//     return result;
// }


Array.prototype.myMap = function(callback,thisArg){
    if(typeof callback !=='function'){
        return new TypeError("callback should be function");
    }
    let result=[];
    for(let i=0;i<this.length;i++){
        if(i in this){
            result.push(callback.call(thisArg,this[i],i,this));
        }
    }
}

const numbers=[1,2,3];
// const doubled = numbers.myMap(function(num){
//     return num*this.multiplier
// },{multiplier:10});
const doubled = numbers.myMap((num)=>num*2);
console.log(doubled);

