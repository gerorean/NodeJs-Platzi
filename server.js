//Modulos:
const express = require ('express');//(ES6)import express form 'express'; ->Servidor rápido
const bodyParser = require('body-parser');//Maneja el body de la petición
const router = require('./network/routes');//Aquí se trae el routes de la capa de red
//const router = require('./components/message/network');//Aquí se trae el routes del componente message

//Objetos:
//const router = express.Router();//Maneja las peticiones (Requests), las cabeceras, se llevo al components-networks.js-router

//MiddleWares de express:
var app = express();//Inicializa - crea el servidor
app.use(bodyParser.json());//A  añade el manejador JSON del cuerpo de la petición, convierte los JSON en objetos de JavaScript  => el body siempre lo encontramos en la request => req.body, para ver el cuerpo se necesita metódo manejador de JSON
app.use(bodyParser.urlencoded({extended:false}));//A    igual que el anterior pero en vez de JSON va a maneja urlencode en el body, esta es opcional, convierte los urlEncoded en objetos de JavaScript ..

router(app);//A     Función que crea todas las rutas necesarias, Método que recive como parametro el servidor => routes.js
//app.use(router);//añade el router a la aplicación de express


app.use('/app',express.static('public'));//A    Servir archivos estáticos desde la carpeta public y ponerlos en la url /app => get http://localhost:3000/app/css/style.css

//app.use('/',function(req,res){//añade la ruta / y hace algo.. toda función HTTP maneja dos parametros, una request y un responsive
//    console.log('app.use /');  
//    res.send('Hola desde cualquiera');//Envia una respuesta al navegador
//})

app.listen(3000);//Servidor escucha en el puerto
console.log('La aplicación esta escuchando en el puerto http://localhost:3000');//Salida por consola


/*
server.js => SERVIDOR
Se encarga de:
1- Recibir las peticiones que vienen desde internet, comprueba que las peticiones sean correctas para poder entregarselas al servidor o directamente cancelarlas si hubiese algún tipo de problema o de fallo
2- Configura toda la información importante del servidor, base de datos, cabeceras, etc..   
*/


/*
A   app.use([path,] callback [, callback...])
http://expressjs.com/en/api.html#app.use
    Mounts the specified middleware function or functions at the specified path: the middleware function is executed when the base of the requested path matches path.
    Monta la función o funciones de middleware especificadas en la ruta especificada: la función de middleware se ejecuta cuando la base de la ruta solicitada coincide con la ruta.
path => Default '/' (root path)
    The path for which the middleware function is invoked;
    La ruta para la que se invoca la función de middleware;
callback =>
    Callback functions; can be:
        A middleware function.
        A series of middleware functions (separated by commas).
        An array of middleware functions.
        A combination of all of the above.
    Funciones de devolución de llamada; puede ser:
        Una función de middleware.
        Una serie de funciones de middleware (separadas por comas).
        Una variedad de funciones de middleware.
        Una combinación de todo lo anterior.
Description
    A route will match any path that follows its path immediately with a “/”. For example: app.use('/apple', ...) will match “/apple”, “/apple/images”, “/apple/images/news”, and so on.
    Since path defaults to “/”, middleware mounted without a path will be executed for every request to the app.
    For example, this middleware function will be executed for every request to the app:
    Una ruta coincidirá con cualquier ruta que siga su ruta inmediatamente con una "/". Por ejemplo: app.use ('/ apple', ...) coincidirá con “/ apple”, “/ apple / images”, “/ apple / images / news”, y así sucesivamente. 
    Dado que la ruta tiene el valor predeterminado "/", el middleware montado sin una ruta se ejecutará para cada solicitud a la aplicación.
    Por ejemplo, esta función de middleware se ejecutará para cada solicitud a la aplicación:
middleware function
    app.use(function (req, res, next) {
        console.log('Time: %d', Date.now())
        next()
    })
*/


/*
instalaciones:
npm install express           // npm i express
node server
sudo npm install nodemon      // nodemon --version
nodemon server                =>reinicia el servidor con cada cambio que sea guardado
npm i body-parser             =>permite trabajar con el body de la petición
npm i mongoose                =>crea esquemas para la base de datos


cuenta en mongodbAtlas:
https://www.mongodb.com/cloud/atlas (Starr free)
https://www.mongodb.com/cloud/atlas/register
*/

