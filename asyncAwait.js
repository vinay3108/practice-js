// const p1  = new Promise((resolve,reject)=>{
//     setTimeout(()=>{resolve("vinay")},20000);
// })

// const p2  = new Promise((resolve,reject)=>{
//     setTimeout(()=>{resolve("kumar")},40000);
// })
// async function getData(){
//     console.log("start");
//     const data1= await p1;
//     console.log(data1);

//     console.log("after 1");
//     const data2 = await p2;
//     console.log(data2);

//     console.log("end");
// }

// getData();
// console.log("here");


// console.log("here2");


const baz = () => console.log('baz');
const foo = () => console.log('foo');
const zoo = () => console.log('zoo');

const start = () => {
  console.log('start');
  setImmediate(baz);
  new Promise((resolve, reject) => {
    resolve('bar');
  }).then(resolve => {
    console.log(resolve);
    process.nextTick(zoo);
  });
  process.nextTick(foo);
};

start();

// start foo bar zoo baz
// output
//start -> foo ->bar ->zoo ->baz