import path from 'path';
import express from 'express';
import http from 'http';


export function initExpress() {
  const app = express();
  const server = http.Server(app);

  app.use(/.*/, (req, res, next) => {
    console.log('Req from:', req.hostname + req.path, (new Date()).toLocaleTimeString());
    next();
  });

  app.get('/', function (req, res) {
    console.log('GET /');
    // console.log('returning', path.join(__dirname, 'public', 'index.html'));
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

  app.use(express.static(path.join(__dirname, 'public')));

  server.listen(3000, function () {
    console.log('Example app listening on port 3000!');
  });

  return server;
}