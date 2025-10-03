function debounce(func,timeout=300){
    let timer;
    return (...arg)=>{
        clearTimeout(timer);
        timer = setTimeout(()=>{func.apply(this,arg)},timeout);
    }
}