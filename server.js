const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  if (req.url === '/ajax.json') {
    const filePath = path.join(__dirname, 'ajax.json');
    const fileStream = fs.createReadStream(filePath);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    fileStream.pipe(res);
  } else if (req.url === '/' || req.url === '/index.html') {
    const filePath = path.join(__dirname, 'index.html');
    const fileStream = fs.createReadStream(filePath);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fileStream.pipe(res);
  } else if (req.url === '/javascripts/ajax_sample.js') {
    const filePath = path.join(__dirname, 'javascripts', 'ajax_sample.js');
    const fileStream = fs.createReadStream(filePath);
    res.writeHead(200, { 'Content-Type': 'text/javascript' });
    fileStream.pipe(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

const port = 8080;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
