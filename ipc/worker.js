// This child listens for messages
console.log(process.pid);
process.on("message", (msg) => {
    if (msg.task === "square") {
      // Simulate heavy work
      console.log("msg "+JSON.stringify(msg));
      const result = msg.number * msg.number;
      process.send({ result });
    }
  });
  