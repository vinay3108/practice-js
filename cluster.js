const express = require("express");
const app = express();
const cluster = require("cluster");
const process = require("node:process");
const numCPUs = require("os").cpus().length;
console.log(`Number of CPUs: ${numCPUs}`);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

if (cluster.isPrimary) {
    // Keep track of http requests
    let numReqs = 0;
    setInterval(() => {
        console.log(`numReqs = ${numReqs}`);
    }, 1000);

    // Count requests
    function messageHandler(msg) {
        if (msg.cmd && msg.cmd === "notifyRequest") {
            numReqs += 1;
        }
    }

    // Start workers and listen for messages containing notifyRequest
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    for (const id in cluster.workers) {
        cluster.workers[id].on("message", messageHandler);
    }
}
{
    app.listen(7000, () => {
        console.log(
            `Server is running on port 7000 with process id ${process.pid}`
        );
    });
}
