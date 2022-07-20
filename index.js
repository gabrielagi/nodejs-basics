// Crear un servidor en NodeJS

const http = require('http');

const callbackServer = (req, res) => {
    res.end('Llamada a un servidor');
};

const server = http.createServer(callbackServer);
server.on('ClientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
server.listen(8000);