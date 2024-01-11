const fs = require('fs');
const os = require('os');

fs.readFile('example.txt', 'utf-8', (err, data) => {

    if (err) {
        console.error('[-] An error occurred while reading a file. : ', err);
        return;
    }
    console.log(data.toString());
});

const hostname = os.hostname();
const cpus = os.cpus();

console.log('[-] hostname : ', hostname);
console.log('[-] cpus : ', cpus);