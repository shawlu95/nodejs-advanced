const express = require('express');
const { pbkdf2 } = require('crypto');
const app = express();

app.get('/', (req, res) => {
  pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    res.send('hi');
  });
});

app.get('/fast', (req, res) => {
  res.send('instantly loaded regardless of blocking method');
});

app.listen(8080, () => {
  console.log('listening on 8080');
});
