const http = require('http');
const fs = require('fs').promises;

const server = http.createServer(async (req, res) => {
    // 헤더
    res.writeHead(200, {'Content-Type': 'text/html; character=utf-8'});
    // 바디
    const data = await fs.readFile('./index.html');
    res.end(data);
});

server.on('request', function() {
    console.log('[-] Inbound request');
});

server.on('connection', function() {
    console.log('[-] Connection established');
});

server.on('close', function() {
    console.log('[-] Connection closed');
});

server.listen(3000);

