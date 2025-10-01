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
  

