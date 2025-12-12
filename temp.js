// console.log(typeof x);
// x = 1;
// console.log(typeof x);

// function outer() {
//     var arr = [];
//     for (var i=0; i<3; i++) {
//       arr.push(function() { return i; });
//     }
//     // console.log(arr[0]());
//     return arr;

//   }
//   const arr = outer();
//   console.log(arr[0], arr[1]); // ?


// const obj = { val: 1 };
// const f = () => this.val;
// console.log(obj.f === f); // ?
// obj.f = f;
// console.log(obj.f()); // ?

// let o = { x: 1 };
// Object.freeze(o);
// o.x = 2; 
// console.log(o.x);

// for (var i = 1; i <= 3; i++) {
//     (function(i) {
//       setTimeout(() => console.log(i), 1000);
//     })(i);
// }

// const greet = function(age){
//     return `i am ${age} year old and my name is ${this.name}`
// }
// const person={
//     name:'vinay'
// }

// Function.prototype.myBind = function(callback,...bindArgs){
//     if(typeof this !=='function'){
//         throw new TypeError("called by function");
//     }
//     const originalFn= this;

//     return function(...callArgs){
//         if(this instanceof originalFn){
//             return new originalFn(...bindArgs,...callArgs);
//         }
//         return originalFn.apply(callback,[...callArgs,...bindArgs]);
//     }
// }

// const bind = greet.myBind(person);
// console.log(bind(20));

// function outer() {
//     var arr = [];
//     for (let i=0; i<3; i++) {
//       arr.push(function() { return i; });
//     }
//     return arr;
//   }
//   const arr = outer();
//   console.log(arr[0](), arr[1]()); // ?


// async function sleep(millis) {
//   return new Promise((resolve,reject)=>{
//       setTimeout(()=>resolve(millis),millis)
//   })
// }

// sleep(1000).then((res)=>{

//   console.log(res);
// })


// let magic =10;
// function magic(){
//   console.log("vinay");
// }

// console.log(magic);


// console.log(globalThis);

// greet();
// var greet = function() { console.log("hi"); }

// var x = 5;
// function x() {}
// console.log(typeof x);

// function test() {
//   console.log(a);
//   var a = 20;
// }
// test();

// function outer() {
//   let a = 10;
//   return function() { console.log(a); };
// }
// const fn = outer();
// fn();

// function counter() {
//   let count = 0;
//   return function() { count++; console.log(count); };
// }
// const c1 = counter();
// c1();
// c1();

// function test() {
//   var a = 10;
//   return () => console.log(a);
//   var a = 20;
// }
// test()();

// console.log(fn);
// var fn = 10;
// function fn() {}

// var a = 1;
// function b() {
//   a = 10;
//   return;
//   function a() {}
// }
// b();
// console.log(a);

// let x = function() {};
// function x() {}
// console.log(typeof x);

// function outer() {
//   var arr = [];
//   for (var i = 0; i < 3; i++) {
//     arr.push(function() { console.log(i); });
//   }
//   return arr;
// }
// const fns = outer();
// fns[0]();
// fns[1]();
// fns[2]();

// function build() {
//   let name = "vinay";
//   return {
//     get() { return name; },
//     set(n) { name = n; }
//   };
// }
// const x = build();
// x.set("rahul");
// console.log(x.get());

function check(){
  var i=0;
  let timer;
  return ()=>{
    if(!timer){

      timer = setInterval(()=>{
        console.log("vvv");
        i++;
        if(i>2){
          clearInterval(timer);
        }
      },1000);
    }
    
    
  }
}
const inter = check();
inter();