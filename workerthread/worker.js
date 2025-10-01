const { parentPort, workerData } = require("worker_threads");

// Heavy computation
function heavySquare(n) {
  let result = 0;
  for (let i = 0; i < 1e7; i++) { // Simulate heavy loop
    result = n * n;
  }
  return result;
}

const num = workerData.number;
const result = heavySquare(num);

// Send back to parent
parentPort.postMessage({ input: num, output: result });
