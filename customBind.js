Function.prototype.myBind = function (context,...bindArgs){
    //this is the function that we want too bind
    if(typeof this !=='function'){
        throw new TypeError("my bind must be called on a function");
    }

    const originalFn = this;
    return function (...callArgs) {
        console.log(originalFn,this);
        if(this instanceof originalFn){

            return new originalFn(...bindArgs,...callArgs);
        }
        return originalFn.apply(context,[...bindArgs,...callArgs]);
    }
}

function greet(greeting, punctuation){
    return `${greeting}, ${this.name} ${punctuation}`;
}
const person = {name:'vinay'};
const greetVinay = greet.myBind(person, "Hello");
console.log(greetVinay("!"));
console.log(greetVinay("..."));

