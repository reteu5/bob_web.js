const http = require('http');
const fs = require('fs').promises;

const server = http.createServer(async (req, res) => {
    try {
        console.log(req.method, req.url);
        if (req.method === 'GET') {
            let data = ''
            if (req.url === '/') {
                data = await fs.readFile('./index.html');
            } else if (req.url === '/about') {
                data = await fs.readFile('./about.html');
            } else if (req.url === '/products') {
                data = await fs.readFile('./products.html');
            } else {
                data = 'Page Not Found'
            }

            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end(data);
        } else {
            console.log('[-] Currently Unavailable')
            res.writeHead(404);
            res.end('Cannot handle these type of method')
        }
    } catch (err) {
        console.error(err);
        res.writeHead(500, {'Content-Type': 'text/plain; charset=utf-8'});
        res.end('Internal error occurred.');
    }
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

