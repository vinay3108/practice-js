const express = require("express");
const { fork } = require("child_process");

const app = express();
const PORT = 3000;

// Route that uses child process for heavy computation
// app.get("/compute/:num1/:num2", (req, res) => {
//   const num = parseInt(req.params.num1, 10);
//   const num2 = parseInt(req.params.num2, 10);

//   // Fork child
//   const child1 = fork("./worker.js");

//   // Send task to child
//   child1.send({ task: "square", number: num });

//   // Wait for response
//   child1.on("message", (msg) => {
//     res.json({ from: "child1", input: num, output: msg.result });
//     child1.kill(); // Clean up child
//   });

//   // Handle errors
//   child1.on("error", (err) => {
//     res.status(500).json({ error: err.message });
//   });

//   const child2 = fork('./worker.js');

//   child2.send({ task: "square", number: num2 });

//   // Wait for response
//   child2.on("message", (msg) => {
//     res.json({ from: "child1", input: num2, output: msg.result });
//     child2.kill(); // Clean up child
//   });

//   // Handle errors
//   child2.on("error", (err) => {
//     res.status(500).json({ error: err.message });
//   });
// });

app.get("/parallel", (req, res) => {
  const worker1 = fork("./worker.js");
  const worker2 = fork("./worker.js");

  let results = [];
  
  worker1.send({ task: "square", number: 8 });
  worker2.send({ task: "square", number: 15 });

  const collect = (msg) => {
    results.push(msg.result);
    if (results.length === 2) {
      res.json({ results });
      worker1.kill();
      worker2.kill();
    }
  };

  worker1.on("message", collect);
  worker2.on("message", collect);
});


app.listen(PORT, () => {
  console.log(`🚀 Express server running at http://localhost:${PORT}`);
});
