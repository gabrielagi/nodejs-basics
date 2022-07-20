// Crear un servidor en NodeJS

const http = require('http');
const { StringDecoder } = require('string_decoder');
const url = require('url');

const callbackServer = (req, res) => {
     //1. Obtener url desde el obejto request
    const urlActual = req.url;
    const urlParseada = url.parse(urlActual, true);

    //2. Obtener la ruta
    const ruta = urlParseada.pathname;

    //3. Quitar slash de las rutas
    const rutaLimpia = ruta.replace(/^\/+|\/+$/g, '');

     //3.1 Obtener el metodo http
    const metodo = req.method.toLowerCase();

    //3.2 obtener variables del query url
    const {query = {}} = urlParseada;
    console.log({query});

    //3.3 Obtener headers
    const {headers = {}} = req;
    console.log({headers});

    //3.4 obtener payload si hay
    const decoder = new StringDecoder('utf-8');
    let buffer = '';

    //3.4.1 Acumula los datos cuando el request recibe un payload
    req.on('data', (data)=> {
        buffer += decoder.write(data);
    });

    //3.4.2 Terminar de acumular
    req.on('end', (data)=> {
        buffer += decoder.end();
        //4. Enviar una respuesta dependiendo de la ruta
        switch(rutaLimpia){
            case 'ruta':
                res.end('Estas en /ruta');
                break;
            default:
                res.end('Ruta desconocida')
        }
    });

    //3.5 ordenar la data
    const data = {
        ruta: rutaLimpia,
        query,
        metodo,
        headers,
        payload: buffer
    };

    //3.6 elegir el manejador de la respuesta/handler
    let handler;
    if (rutaLimpia && enrutador[rutaLimpia]) {
      handler = enrutador[rutaLimpia];
    } else {
      handler = enrutador.noEncontrado;
    }
    console.log("handler", handler);

const enrutador = {
    ruta: (data, callback) => {
      callback(200, { mensaje: "esta es /ruta" })
    },
    mascotas: mascotas(recursos.mascotas),
    veterinarias: veterinarias(recursos.veterinarias),
    duenos: duenos(recursos.duenos),
    consultas: consultas(recursos.consultas),
    noEncontrado: (data, callback) => {
      callback(404, { mensaje: "no encontrado" });
    },
  };

  // 4. ejecutar handler (manejador) para enviar la respuesta
  if (typeof handler === "function") {
    handler(data, (statusCode = 200, mensaje) => {
      const respuesta = JSON.stringify(mensaje);
      res.setHeader("Content-Type", "application/json");
      res.writeHead(statusCode);
      // linea donde realmente ya estamos respondiendo a la aplicación cliente
      res.end(respuesta);
    });
  }
  // respuestas según la ruta
  
};

const server = http.createServer(callbackServer);
server.on('ClientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
server.listen(5000, ()=>{
    console.log('El servidor escucha peticion en https://localhost:5000');
});