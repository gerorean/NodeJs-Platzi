//Modulos:
const express = require ('express');//(ES6)import express form 'express'; ->Servidor rápido
const response = require('../../network/response');//Maneja las respuestas de las peticiones cuando van bien y cuando van mal
const controller = require('./controller');//Trae el controlador

//Objetos:
const router = express.Router();//Maneja las peticiones (Requests), las cabeceras

//Rutas que queremos que escuche para cada uno de los metódos:
router.get('/',function(req,res){//añade la ruta / y hace algo.. toda función HTTP maneja dos parametros, una request y un responsive
//router.get('/message',function(req,res){//añade la ruta / y hace algo.. toda función HTTP maneja dos parametros, una request y un responsive
    console.log('req.header=',req.headers);//Leer cabeceras del req
    res.header({'custom-header':'Nuestro valor personalizado',});//Cabecera personalizada => ver Headers de la res en Postman
    console.log('res.header=',res.header);//Leer cabeceras del res
    console.log('body=',req.body);
    console.log('query=',req.query);//get localhost:3000/message?orderBy=Id
    console.log('get /message');
    controller.getMessages()//Trae la promesa
        .then((messageList) => {
            response.success(req,res,messageList,200);//Respuesta exitosa personalizada desde el modulo response 
        })
        .catch(e => {
            response.error(req,res,'Unexpected error',500,e);//Respuesta fallida personalizada desde el modulo response sin status
        })
    ;
    //response.success(req,res,'Lista de mensajes');//Respuesta exitosa personalizada desde el modulo response
    //response.success(req,res);//Responde exitosamente sin personalizar desde el modulo response
    //res.send('Lista de mensajes');//Envia una respuesta al navegador
});

router.post('/',function(req,res){//añade la ruta / y hace algo.. toda función HTTP maneja dos parametros, una request y un responsive
//router.post('/message',function(req,res){//añade la ruta / y hace algo.. toda función HTTP maneja dos parametros, una request y un responsive
    console.log('body=',req.body);//consultas por el body => se usa mucho cache-control, para cache espesificos de imagenes, archivos; user-agent para tipo de navegador
    console.log('query=',req.query);//consultas por query - post localhost:3000/message?orderBy=Idi - - - localhost:3000/message?orderBy=Idi&age=15
    console.log('post /message');
    controller.addMessage(req.body.user,req.body.message)
        //IN2     addMessage [new promise] <= controler.js
        .then((fullMessage) => {
            response.success(req,res,fullMessage,201);//Respuesta exitosa personalizada desde el modulo response   
            //response.success(req,res,'Creado correctamente',201);//Respuesta exitosa personalizada desde el modulo response
        })
        .catch((reject) => {
            response.error(req,res,reject,400,'Error en el controlador');//Respuesta fallida personalizada desde el modulo response sin status
        })
        //.catch((e) => {
        //    response.error(req,res,'Información invalida',400,'Error en el controlador');//Respuesta fallida personalizada desde el modulo response sin status
        //})
    ;//Agrega un mensaje, le pasamos2 propiedades: el usuario y el mensaje
    ////if (req.query.error == 'ok'){//Simular un error desde query => Post localhost:3000/message?error=ok
    ////    response.error(req,res,'Error inesperado',500,'Es solo una simulación de los errores');//Respuesta fallida personalizada desde el modulo response sin status
    ////    //response.error(req,res,'Error simulado');//Respuesta exitosa personalizada desde el modulo response sin status
    ////    //response.error(req,res,'Error simulado',401);//Respuesta exitosa personalizada desde el modulo response con status
    ////    //response.error(req,res,'Error simulado',400);//Respuesta exitosa personalizada desde el modulo response con status
    ////}
    ////else{
    ////    response.success(req,res,'Creado correctamente',201);//Respuesta exitosa personalizada desde el modulo response   
    ////}
    //response.success(req,res,'Creado correctamente',201);//Respuesta exitosa personalizada desde el modulo response
    //res.status(201).send([{'error':'','body':'Creado correctamente'}]);//Envía un objeto con el status y una respuesta vacía al navegador
    //res.status(201).send({'error':'','body':'Creado correctamente'});//Envía el status y una respuesta vacía al navegador
    //res.status(201).send();//Envía el status y una respuesta vacía al navegador
    //res.send('Mensaje '+ req.body.text +' añadido corretamente');//Envia una respuesta plana al navegador
    //res.send();//Envia una respuesta vacía al navegador
});

//router.get('/',function(req,res){//añade la ruta / y hace algo.. toda función HTTP maneja dos parametros, una request y un responsive
//    console.log('router.get /');
//    res.send('Hola desde get/');//Envia una respuesta al navegador
//});

//console.log('C-network.js *** *** ***router=',router);
module.exports = router;//trae las rutas de cada componente (message, user, etc) y las exporta

/*
networks.js MANEJADOR DE RUTAS, PERTENECE AL COMPONENTE: MENSAJE
1- Tiene todos los end points de los mensajes que tengan que ver con el servidor http
2- Recibe la información que le pasa el routes.js
3- Recibe peticiones http, procesa toda la información y se la envía al controlador
*/