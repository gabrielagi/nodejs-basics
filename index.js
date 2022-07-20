// Crear un servidor en NodeJS

const http = require('http');
const url = require('url');

const callbackServer = (req, res) => {
     //1. Obtener url desde el obejto request
    const urlActual = req.url;
    const urlParseada = url.parse(urlActual, true);
    //2. Obtener la ruta
    const ruta = urlParseada.pathname;
    //3. Enviar una respuesta dependiendo de la ruta
    if(ruta === '/ruta') {
    res.end('Estas en /ruta');
    }
    else {
        res.end('Ruta desconocida');
    }
};

const server = http.createServer(callbackServer);
server.on('ClientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
server.listen(5000, ()=>{
    console.log('El servidor escucha peticion en https://localhost:5000');
});