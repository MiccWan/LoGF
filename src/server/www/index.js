import path from 'path';
import express from 'express';
import http from 'http';


export function initExpress() {
  const app = express();
  const server = http.Server(app);

  app.use('/', express.static(path.join(__dirname, 'public')));

  app.get('/', function (req, res) {
    console.log('GET /');
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

  server.listen(3000, function () {
    console.log('Example app listening on port 3000!');
  });

  return server;
}