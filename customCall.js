Function.prototype.myCall = function(context,...args){
    if(typeof this !=='function'){
        return new TypeError("Mycall called by function");
    }
    context = context?? globalThis;
    const fnSymbol = Symbol();
    context[fnSymbol]=this;
    console.log(context);
    const result = context[fnSymbol](...args);
    delete context[fnSymbol];
    return result;
}

function sayHello(greeting, punctuation) {
    return `${greeting}, I am ${this.name} ${punctuation}`;
}

const person = { name: "Vinay" };

console.log(sayHello.myCall(person, "Hi", "!"));