//instalaciones:
//npm install express           // npm i express
//node server
//sudo npm install nodemon      // nodemon --version
//nodemon server                =>reinicia el servidor con cada cambio que sea guardado
//npm i body-parser             =>permite trabajar con el body de la petición

//Modulos:
const express = require ('express');//(ES6)import express form 'express'; ->Servidor rápido
const bodyParser = require('body-parser');//Maneja el body de la petición

//Objetos:
const router = require('./network/routes');//Aquí se trae el routes del componente message
//const router = require('./components/message/network');//Aquí se trae el routes del componente message
//const router = express.Router();//Maneja las peticiones (Requests), las cabeceras, se llevo al components-networks.js-router


//MiddleWares de express:
var app = express();//Inicializa - añade el servidor
app.use(bodyParser.json());//añade el manejador JSON del cuerpo de la petición, convierte los JSON en objetos de JavaScript  => el body siempre lo encontramos en la request => req.body, para ver el cuerpo se necesita metódo manejador de JSON
app.use(bodyParser.urlencoded({extended:false}));//igual que el anterior pero en vez de JSON va a maneja urlencode en el body, esta es opcional, convierte los urlEncoded en objetos de JavaScript ..

router(app);//Función que crea todas las rutas necesarias, Método que recive como parametro el servidor => routes.js => function(server){server.use('./message',message)}
//app.use(router);//añade el router a la aplicación de express


app.use('/app',express.static('public'));//Servir archivos estáticos desde la carpeta public y ponerlos en la url /app => get http://localhost:3000/app/css/style.css

//app.use('/',function(req,res){//añade la ruta / y hace algo.. toda función HTTP maneja dos parametros, una request y un responsive
//    console.log('app.use /');  
//    res.send('Hola desde cualquiera');//Envia una respuesta al navegador
//})

app.listen(3000);//Servidor escucha en el puerto
console.log('La aplicación esta escuchando en el puerto http://localhost:3000');//Salida por consola


/*
capas:
Cliente_Usuario
internet=> peticion

Servidor
1SERVIDOR server.js/configuración
    2RED routes.js/rutas + response.js/respuestas
        3COMPONENTS 
            4message
                [networks.js/http, controller.js/logicaDelNegocio, store.js_Donde y como se guarda la info/Bd],
            4user
                [networks.js/http, controller.js/logicaDelNegocio, store.js_Donde y como se guarda la info/Bd]
*/