const express = require("express");
const { Worker } = require("worker_threads");

const app = express();
console.log(process.pid);
// Run worker with proper error handling
function runWorker(number) {
  return new Promise((resolve, reject) => {
    try {
      const worker = new Worker("./fib-worker.js", { workerData: number });
      // Listen for message
      worker.on("message", resolve);

      // Listen for error from worker
      worker.on("error", (err) => {
        console.error("Worker error:", err);
        reject(new Error("Worker encountered an error"));
      });

      // Listen for exit event
      worker.on("exit", (code) => {
        if (code !== 0) {
          console.error(`Worker stopped with code ${code}`);
          reject(new Error(`Worker stopped unexpectedly with code ${code}`));
        }
      });
    } catch (err) {
      // Catch synchronous errors
      console.error("Failed to start worker:", err);
      reject(err);
    }
  });
}


// Route to calculate Fibonacci
app.get("/fib/:n", async (req, res) => {
  const num = parseInt(req.params.n, 10);

  if (isNaN(num) || num < 0) {
    return res.status(400).json({ error: "Please provide a valid non-negative number" });
  }

  try {
    const result = await runWorker(num);
    res.json({ input: num, fib: result });
  } catch (err) {
    console.error("Error computing Fibonacci:", err);
    res.status(500).json({ error: err.message });
  }
});

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Global error handler (fallback)
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(3000, () => console.log("Server running on port 3000"));
