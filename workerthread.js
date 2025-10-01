const { Worker } = require("worker_threads");

console.log("Main thread starting...");

// Create worker
const worker = new Worker("./worker.js", {
  workerData: { number: 10 }  // Send initial data
});

// Listen for result
worker.on("message", (msg) => {
  console.log("Main thread got:", msg);
});

// Error handling
worker.on("error", (err) => {
  console.error("Worker error:", err);
});

// Exit event
worker.on("exit", (code) => {
  console.log(`Worker exited with code ${code}`);
});
