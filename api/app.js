import http from 'node:http';
import process from 'node:process';

const server = http.createServer(async (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('This is a simle server');
});

server.on('clientError', (err, socket) => {
  if (err) console.log(err);
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.listen(parseInt(process.env.PORT, 10) || 8000);

process.on('SIGINT', () => {
  server.close((error) => {
    if (error) {
      console.log(error);
      process.exit(1);
    }
    process.exit(0);
  });
});
