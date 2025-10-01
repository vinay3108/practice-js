// const obj = {
//     counter : 0,
//     getCounter : function(){
//         return this.counter;
//     },
//     setCounter: function (){
//         this.counter++;
//     }
// }
// const person ={
//     name:'vinay',
//     getDetail : function(){
//         return `${this.name} is count ${this.counter}`;
//     }
// };
// // console.log(obj.counter);
// // obj.setCounter()
// // console.log(obj.getCounter());
// console.log(person.getDetail.call(obj));


// function makeCounter() {
//     let count = 0;
//     return () => count++;
//   }
//   const c1 = makeCounter();
//   const c2 = makeCounter();
//   console.log(c1(), c1(), c2(), c2());

// function Foo(){}
// Foo.prototype.bar = 42;
// const f = new Foo();
// console.log(f.bar, f.hasOwnProperty('bar'));


// function once(fn){
//     let called = false;
//     let result ;
//     return function (...args){
//         if(!called){
//             called=true;
//             result=fn.apply(this,args);
//         }
//         return result;
//     }
// }

// const add = function (a,b) {
//     return a+b;
// }
// const onceAdd = once(add);
// console.log(onceAdd(2,3));
// console.log(onceAdd(2,7));


// function greet(...args) {
//     // console.log(args);
//     return `${args[0]}, ${this.name}${args[1]}`;
//   }
  
//   const person = { name: "Vinay" };
  
//   // bind `this` to person
//   const greetVinay = greet.bind(person, "Hello");
  
//   console.log(greetVinay("!")); 


function getUser(id, cb) {
  setTimeout(() => cb({ id, name: "Alice" }), 1000);
}
function getPosts(userId, cb) {
  setTimeout(() => cb(["Post1", "Post2"]), 1000);
}
function getComments(post, cb) {
  setTimeout(() => cb(["Comment1", "Comment2"]), 1000);
}

// Callback hell 😬
getUser(1, user => {
  getPosts(user.id, posts => {
    getComments(posts[0], comments => {
      console.log(user, posts, comments);
    });
  });
});