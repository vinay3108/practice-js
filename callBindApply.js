
// Function.prototype.myCall = function(thisArg,...args){
//   if(typeof this!=='function'){
//       return new TypeError("this should be function");
//   }
//   // let originalFn=this;
//   thisArg = thisArg ?? globalThis;
//   const symbol = Symbol();
//   thisArg[symbol]=this;
//   const result = thisArg[symbol](...args);
//   delete thisArg[symbol];
//   return result;

// }

// Function.prototype.myApply = function(thisArg, args){
//   if(typeof this!=='function'){
//       return new TypeError("this should be function");
//   }
//   const symbol = Symbol();
//   thisArg[symbol]=this;
//   const result = Array.isArray(args) ? thisArg[symbol](...args):thisArg[symbol]();
//   delete thisArg[symbol];
//   return result;
// }

// Function.prototype.myBind = function (context,...bindArgs) {
//   if(typeof this!=='function'){
//       return new TypeError("this should be function");
//   }
//   let originalFn = this;
//   return function(...callArgs){
//       if(this instanceof originalFn){
//           return new originalFn(...bindArgs,...callArgs);
//       }
//       return originalFn.myApply(context,[...bindArgs,...callArgs]);
//   }
// }

// const greet = function (greeting,punctuation) {
//   return `${greeting} ${this.name} ${punctuation}`;
// }
// const person ={name:"vinay"};

// // console.log(greet.myCall(person,'hello','!'));



// const bind = greet.myBind(person,'hello');
// console.log(bind('ccccccccc'));


Function.prototype.myCall= function (thisArgs,...args){
  if(typeof this!='function'){
    return new TypeError("called should be function");
  }
  thisArgs= thisArgs ??globalThis;
  const symbol = Symbol();
  thisArgs[symbol]=this;
  const result = thisArgs[symbol](...args);
  delete thisArgs[symbol];
  return result;
}

Function.prototype.myApply=function(thisArgs,args){
  if(typeof this !== 'function'){
    return new TypeError("called by a function");
  }
  thisArgs = thisArgs ?? globalThis;
  const symbol = Symbol();
  thisArgs[symbol]=this;
  const result = Array.isArray(args)?thisArgs[symbol](...args):thisArgs[symbol]();
  delete thisArgs[symbol];
  return result;
}
Function.prototype.myBind = function(thisArg,...bindArgs){
  if(typeof this !=='function'){
    return new TypeError('called by a function');
  }
  const originalFn = this;
  return function(...callArgs){
      if(this instanceof originalFn){
        return new originalFn(...bindArgs,...callArgs);
      }
      return thisArg.apply(this,[...bindArgs,...callArgs]);
  }

}

const greet = function (greeting,punctuation) {
  return `${greeting} ${this.name} ${punctuation}`;
}
const person ={name:"vinay"};

console.log(greet.myCall(person,'hello','!'));
