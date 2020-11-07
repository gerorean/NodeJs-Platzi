//Modulos:
const express = require ('express');//(ES6)import express form 'express'; ->Servidor rápido
const response = require('../../network/response');//Maneja las respuestas de las peticiones cuando van bien y cuando van mal
const controller = require('./controller');//Trae el controlador

//Objetos:
const router = express.Router();//Maneja las peticiones (Requests), las cabeceras

//Rutas que queremos que escuche para cada uno de los metódos:
router.post('/',function(req,res){//añade la ruta / y hace algo.. toda función HTTP maneja dos parametros, una request y un responsive
    console.log('post => /chat');
    console.log('body=',req.body);//consultas por el body => se usa mucho cache-control, para cache espesificos de imagenes, archivos; user-agent para tipo de navegador
    console.log('query=',req.query);//consultas por query - post localhost:3000/message?orderBy=Idi - - - localhost:3000/message?orderBy=Idi&age=15
    console.log('post /chat');
    controller.addChat(req.body.users)
        //IN2     addMessage [new promise] <= controler.js
        .then((data) => {
            //respuesta
            response.success(req,res,data,201);//Respuesta exitosa personalizada desde el modulo response   
        })
        .catch((err) => {
            //respuesta
            response.error(req,res,'Internal Error',500,err);//Respuesta fallida personalizada desde el modulo response sin status
        })
});


router.get('/:userId',function(req,res){//añade la ruta / y hace algo.. toda función HTTP maneja dos parametros, una request y un responsive
//router.get('/message',function(req,res){//añade la ruta / y hace algo.. toda función HTTP maneja dos parametros, una request y un responsive
    console.log('get => /chat');
    console.log('req.header=',req.headers);//Leer cabeceras del req
    res.header({'custom-header':'Nuestro valor personalizado',});//Cabecera personalizada => ver Headers de la res en Postman
    console.log('res.header=',res.header);//Leer cabeceras del res
    console.log('body=',req.body);
    console.log('query=',req.query);//get localhost:3000/message?orderBy=Id
    controller.listChats(req.params.userId)//Trae la promesa (con el userId)
    //controller.getMessages()//Trae la promesa
        .then((users) => {
            //respuesta
            response.success(req,res,users,200);//Respuesta exitosa personalizada desde el modulo response 
        })
        .catch(err => {
            //respuesta
            response.error(req,res,'Internal error',500,err);//Respuesta fallida personalizada desde el modulo response sin status
        })
    ;
});


//EXPORTS
module.exports = router;//trae las rutas de cada componente (message, user, etc) y las exporta

/*
networks.js MANEJADOR DE RUTAS, PERTENECE AL COMPONENTE: MENSAJE
1- Tiene todos los end points de los mensajes que tengan que ver con el servidor http
2- Recibe la información que le pasa el routes.js
3- Recibe peticiones http, procesa toda la información y se la envía al controlador
*/