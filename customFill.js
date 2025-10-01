// ******************
//not right fully this mutable so don't create a new array change in existing
Array.prototype.myFill = function (value,start,end) {
    // console.log(callback,thisArg,value,start,end);
    let res =[];
    let arr = this;
    for(let i=0;i<arr.length;i++){
        if(i in arr){
            if(i>=start && i<end){
                res.push(value);
            }else{
                res.push(arr[i]);
            }
        }
    }
    return res;
}


console.log([1,2,3,4,5].myFill(0,2,4));