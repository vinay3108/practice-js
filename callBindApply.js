// ********************************************************************
// do it 



// function greet(arg1,arg2){
//     console.log(`${arg1} your ${arg2} is ${this.name}`);
// }
// const person ={
//     name:"vinay"
// }
// greet.call(person,"hello","age");
//   // Hello, Asha!


const obj = {
    x: 42,
    getX() { return this.x; }
  };
  
  const unbound = obj.getX;
  console.log(unbound());         // this -> undefined (or global) => wrong
  const bound = unbound.bind(obj);
  console.log(bound());           // 42