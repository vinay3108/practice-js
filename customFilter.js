Array.prototype.customFilter= function(callback,thisArg){
    if(typeof callback !=='function'){
        return new TypeError("callback should be function");
    }
    let arr = this;
    let res =[];
    for(let i=0;i<arr.length;i++){
        if(i in arr){
            if(callback.call(thisArg,arr[i],i,arr)){
                res.push(arr[i]);
            }
        }
    }
    return res;
}

const filteredValue = [1,2,3,4,5].customFilter((num)=>num>3);
console.log(filteredValue);