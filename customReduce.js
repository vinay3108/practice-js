// //in built reduce

// // console.log([1,2,3,4,5].reduce((accumulator,currentValue)=>{return [...accumulator,2*currentValue]},[]));

// Array.prototype.myReduce = function(callback, initialValue) {
//     if (typeof callback !== 'function') {
//         throw new TypeError(callback + " is not a function");
//     }

//     const arr = this;
//     let accumulator;
//     let startIndex;
//     console.log(arguments);

//     if (arguments.length >= 2) {        // if initialValue provided
//         accumulator = initialValue;
//         startIndex = 0;
//     } else {
//         if (arr.length === 0) {
//             throw new TypeError("Reduce of empty array with no initial value");
//         }
//         accumulator = arr[0];           // first element as initial
//         startIndex = 1;
//     }

//     for (let i = startIndex; i < arr.length; i++) {
//         if (i in arr) { // skip holes in sparse arrays
//             accumulator = callback(accumulator, arr[i], i, arr);
//         }
//     }

//     return accumulator;
// };

// console.log([1,2,3,4,5].myReduce((accumulator,currentValue)=>{return [...accumulator,2*currentValue]},[]));


Array.prototype.myReduce = function(callback, initialValue) {
    if(typeof callback !=='function'){
        return new TypeError("callback should be a function");
    }
    const arr = this;
    let accumulator;
    let startIndex;
    if(arguments.length>=2){ //i.e initialValue provided
        accumulator=initialValue;
        startIndex=0;

    }else{
        if(arr.length==0){
            throw new TypeError("arr should not be empty");
        }
        accumulator=arr[0];
        startIndex=1;
    }

    for(let i=startIndex;i<arr.length;i++){
        if(i in arr){
            accumulator = callback(accumulator,arr[i],i,arr);
        }
    }
    return accumulator;
}

console.log([1,2,3,4,5].myReduce((accumulator,currentValue)=>{return [...accumulator,2*currentValue]},[]));