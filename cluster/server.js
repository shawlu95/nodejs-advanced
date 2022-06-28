const cluster = require("cluster");

if (cluster.isMaster) {
  console.log("isMaster: spin up and monitor workers");

  // execute server.js to be executed in worker mode x 4
  cluster.fork();
  cluster.fork();
  cluster.fork();
  cluster.fork();
} else {
  console.log("isWorker: start express server");
  const express = require("express");
  const app = express();

  /**
   * Run while loop insanely fast, block event loop
   * form handling any request
   * @param duration in millisec
   */
  function doWork(duration) {
    const start = Date.now();
    while (Date.now() - start < duration) {}
  }

  app.get("/", (req, res) => {
    doWork(5000);
    res.send("hi");
  });

  app.get("/fast", (req, res) => {
    res.send("instantly loaded regardless of blocking method");
  });

  app.listen(8080, () => {
    console.log("listening on 8080");
  });
}
