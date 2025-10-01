const a= 100;
setImmediate(() => {console.log("set immediate")});
Promise.resolve().then(() => {console.log("promise resolved")});
setTimeout(() => {console.log("set timeout")},0);
process.nextTick(() => {console.log("next tick")});
function printA() {
    console.log(a);
}
printA();
console.log("end of file");