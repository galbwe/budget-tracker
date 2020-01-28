const express = require('express');
const api = express();
const port = 8080;

api.get('/test', (req, res) => {
  res.send('It works!');
});

api.listen(port, () => console.log('API listening on port ' + port));
