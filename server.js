const http = require('http'); 
const os = require('os'); 
const path = require('path'); 
const EventEmitter = require('events'); 

class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

const systemInfo = `
System Platform: ${os.platform()}
System Architecture: ${os.arch()}
CPU Count: ${os.cpus().length}
Free Memory: ${os.freemem() / (1024 * 1024)} MB
Total Memory: ${os.totalmem() / (1024 * 1024)} MB
Home Directory: ${os.homedir()}
`;

const filePath = path.join(__dirname, 'server.js'); 

myEmitter.on('eventOccurred', (message) => {
  console.log(`Event Triggered: ${message}`);
});

const server = http.createServer((req, res) => {
  if (req.url === '/system-info') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(systemInfo); 
  } else if (req.url === '/file-path') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`File Path of this script: ${filePath}`);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Page Not Found');
  }

  // Trigger an event when a request is made
  myEmitter.emit('eventOccurred', `Request received for ${req.url}`);
});

// Start the server
const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
