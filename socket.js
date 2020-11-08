const socketIO = require('socket.io');//Trae el modulo socket.io, require('socket.io') esta importando una función
const socket = {};//Se crea un objeto para ser usado como referencia, cada vez que el objeto cambie, la variable va a estar actualizada

function connect(server){//Crear una función de conexión con socket.io
    socket.io = socketIO(server);// => socket.io equivale a = const io = require('socket.io)(server), es como si se estuviera inicializando .io dentro de la variable socket
}

/*
var webS = io(app);
webS.on('connection', function (socket){
    console.log('Nuevo cliente conectado');//Cada vez que se genere una conexión nueva le enviamos el mensaje de bienvenido
    socket.emit('mensaje','Bienvenido!');
})
*/

module.exports = {// para hacerlo en cualquier sitio, se exporta
    connect,//Función de conexión
    socket,//Socket, que tendra la instancia de socket io
}

/*
socket.js   => servidor de socket io, web sockets
1- Inicializa el servidor de socket io
2- Generar una instancia para poderla compartir

*/
