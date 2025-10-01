Array.prototype.myFlat = function (depth) {
    const flatten = (arr,depth) =>{
        return arr.reduce((accumulator,value)=>{
            if(Array.isArray(value) && depth>0){
                accumulator.push(...flatten(value,depth-1));
            }else{
                accumulator.push(value);
            }
            return accumulator;
        },[]);
    }
    return flatten(this,depth);
}
console.log([1,[2]].myFlat(1));