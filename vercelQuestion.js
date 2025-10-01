// const a = {};
// const b = { key: 'b' };
// const c = { key: 'c' };
// const d = { key: 'd' };

// a[b] = 123;
// a[c] = 456;
// a[d] = 1222;


// console.log(a[d]);

// const person = { name: 'Lydia' };

// function sayHi(age) {
//   return `${this.name} is ${age}`;
// }

// console.log(sayHi.call(person, 21));
// console.log(sayHi.bind(person, 21));
// console.log(sayHi.bind(person, 21)());


// const numbers = [1, 2, 3];
// numbers[10] = 11;
// console.log(numbers);


// function* generator(i) {
//     yield i;
//     yield i * 2;
//     yield i *3;
//   }
  
//   const gen = generator(10);
  
//   console.log(gen.next().value);
//   console.log(gen.next().value);
//   console.log(gen.next().value);


//Need to search on gpt
// const value = { number: 10 };

// const multiply = (x = { ...value }) => {
//   console.log((x.number *= 2));
// };

// multiply();
// multiply();
// multiply(value);
// multiply(value);



// [1, 2, 3, 4].reduce((x, y) => console.log(x, y));

// class Counter {
//     #number = 10
  
//     increment() {
//       this.#number++
//     }
  
//     getNum() {
//       return this.#number
//     }
//   }
  
//   const counter = new Counter()
//   counter.increment()
  
//   console.log(counter.#number);


const promise1 = Promise.resolve('First')
const promise2 = Promise.resolve('Second')
const promise3 = Promise.reject('Third')
const promise4 = Promise.resolve('Fourth')

const runPromises = async () => {
    const res1 = await Promise.all([promise1, promise2])
    const res2  = await Promise.all([promise3, promise4])
    // console.log(res1mr)
    return [res1, res2]
}

runPromises()
    .then(res => console.log(res))
    .catch(err => console.log('vvv',err))