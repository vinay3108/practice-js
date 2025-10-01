Function.prototype.myApply = function(thisArg,args){
    if(typeof this !=='function'){
        return new TypeError("not called by function");
    }
    thisArg = thisArg ?? globalThis;
    const symbolFn = Symbol();
    thisArg[symbolFn] = this;
    const result = Array.isArray(args) ? thisArg[symbolFn](...args) : thisArg[symbolFn]();
    delete thisArg[symbolFn];
    return result;
}

const greeting = function(...arguments) {
    return `this is ${arguments[0]} with ${this.name} is good ${arguments[1] || 'boy'}`;
}
const person = {name:"vinay"};

console.log(greeting.myApply(person,['welcome']));