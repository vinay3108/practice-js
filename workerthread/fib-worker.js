const { parentPort, workerData } = require("worker_threads");

function fib(n) {
  return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}
console.log(process.pid);

const result = fib(workerData);
parentPort.postMessage(result);
