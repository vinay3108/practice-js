Array.prototype.myMap = function (callback,thisArg){
    console.log(callback,thisArg);
    if(typeof callback !== 'function'){
        throw new TypeError("callback should be function");
    }

    let result = [];
    let arr = this;
    console.log(arr.length);
    for(let i=0;i<arr.length;i++){
        if(i in arr){
            result.push(callback.call(thisArg,arr[i],i,arr));
        }
    }
    return result;
}

const numbers=[1,2,3];
// const doubled = numbers.myMap(function(num){
//     return num*this.multiplier
// },{multiplier:10});
const doubled = numbers.myMap((num)=>num*2);
console.log(doubled);

