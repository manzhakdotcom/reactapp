const http = require('http');
const fs = require('fs');
const crypto = require('crypto');
const zlib = require('zlib');

const server = http.createServer((req, res) => {
  const filename = req.headers.filenames;
  console.log('File request received:' + filename);
  req
    .pipe(crypto.createCipheriv('aes192', 'a_shared_secret'))
    .pipe(zlib.createGunzip())
    .pipe(fs.createWriteStream('new.' + filename))
    .on('finish', () => {
      res.writeHead(201, { 'Content-Type': 'text/plain' });
      res.end("That's it\n");
      console.log(`File saved: ${filename}`);
    });
});

server.listen(3000, () => console.log('Listening'));
