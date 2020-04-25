import path from 'path';
import express from 'express';

const app = express();

app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  console.log('GET /');
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});