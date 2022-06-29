const express = require('express');
const app = express();
const Worker = require('webworker-threads').Worker;

app.get('/', (req, res) => {
  const worker = new Worker(function () {
    // worker receives message, do some heavy lifting
    this.onmessage = function () {
      let counter = 0;
      while (counter <= 1e9) {
        counter++;
      }
      // worker sends a message
      postMessage(counter);
    };
  });

  // receive a message from worker
  worker.onmessage = function (message) {
    console.log(message.data); // 1e9
    res.send(message.data + ''); // cast to str
  };

  // send a message to worker
  worker.postMessage();
});

app.get('/fast', (req, res) => {
  res.send('instantly loaded regardless of blocking method');
});

app.listen(8080, () => {
  console.log('listening on 8080');
});
