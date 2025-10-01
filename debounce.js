function debounce(thisArg,wait=200,options={immediate:false}){
    let timer = null;
    function debounced(...args){
        const context = this;
        const later = () =>{
            timer=null;
            if(!options.immediate) thisArg.apply(context,args);
        }
        const callNow = 
    }
}