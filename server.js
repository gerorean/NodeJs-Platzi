//npm install express - npm i express
//Modulos:
const express = require ('express');//(ES6)import express form 'express'; ->Servidor rápido

//Objetos:
const router = express.Router();//Maneja las peticiones (Requests), las cabeceras
var app = express();//Inicializa el servidor
app.use(router);//añade el router a la aplicación de express

//Rutas para cada uno de los metódos:
router.get('/message',function(req,res){//añade la ruta / y hace algo.. toda función HTTP maneja dos parametros, una request y un responsive
    console.log('get /message');
    res.send('Lista de mensajes');//Envia una respuesta al navegador
});
router.post('/message',function(req,res){//añade la ruta / y hace algo.. toda función HTTP maneja dos parametros, una request y un responsive
    console.log('post /message');
    res.send('Mensaje añadido');//Envia una respuesta al navegador
});

//router.get('/',function(req,res){//añade la ruta / y hace algo.. toda función HTTP maneja dos parametros, una request y un responsive
//    console.log('router.get /');
//    res.send('Hola desde get/');//Envia una respuesta al navegador
//});

//app.use('/',function(req,res){//añade la ruta / y hace algo.. toda función HTTP maneja dos parametros, una request y un responsive
//    console.log('app.use /');  
//    res.send('Hola desde cualquiera');//Envia una respuesta al navegador
//})

app.listen(3000);//Servidor escucha en el puerto
console.log('La aplicación esta escuchando en el puerto http://localhost:3000');//Salida por consola