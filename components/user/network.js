//Modulos:
const express = require ('express');//(ES6)import express form 'express'; ->Servidor rápido
const response = require('../../network/response');//Maneja las respuestas de las peticiones cuando van bien y cuando van mal
const controller = require('./controller');//Trae el controlador

//Objetos:
const router = express.Router();//Maneja las peticiones (Requests), las cabeceras

//Añadir usuario
router.post('/',function(req,res){//añade la ruta / y hace algo.. toda función HTTP maneja dos parametros, una request y un responsive
    console.log('post => /user');
    console.log('body=',req.body);//consultas por el body => se usa mucho cache-control, para cache espesificos de imagenes, archivos; user-agent para tipo de navegador
    console.log('query=',req.query);//consultas por query - post localhost:3000/message?orderBy=Idi - - - localhost:3000/message?orderBy=Idi&age=15
    console.log('- - [network] req.body.name=',req.body.name);
    controller.addUser(req.body.name)
        //IN2     addMessage [new promise] <= controler.js
        .then((data) => {
            console.log('- - [networks] then data');
            //respuesta
            response.success(req,res,data,201);//Respuesta exitosa personalizada desde el modulo response   
            //response.success(req,res,'Creado correctamente',201);//Respuesta exitosa personalizada desde el modulo response
        })
        .catch((err) => {
            console.log('- - [networks] catch err');
            //respuesta
            response.error(req,res, 'Internal error', 400, err);//Respuesta fallida personalizada desde el modulo response sin status
        })
    ;//Agrega un usuario, le pasamos la propiedad: nombre
});


router.get('/',function(req,res){//añade la ruta / y hace algo.. toda función HTTP maneja dos parametros, una request y un responsive
    console.log('get => /user');
    console.log('req.header=',req.headers);//Leer cabeceras del req
    res.header({'custom-header':'Nuestro valor personalizado',});//Cabecera personalizada => ver Headers de la res en Postman
    console.log('res.header=',res.header);//Leer cabeceras del res
    console.log('body=',req.body);
    console.log('query=',req.query);//get localhost:3000/message?orderBy=Id
    
    //const filterUsers = req.query.user || null;//Consultas con query ?--=**
    controller.listUsers()//Trae la promesa ()
        .then((Users) => {
            //respuesta
            response.success(req,res,Users,200);//Respuesta exitosa personalizada desde el modulo response 
        })
        .catch(e => {
            //respuesta
            response.error(req,res,'Internal error',500,e);//Respuesta fallida personalizada desde el modulo response sin status
        })
    ;
    //response.success(req,res,'Lista de mensajes');//Respuesta exitosa personalizada desde el modulo response
    //response.success(req,res);//Responde exitosamente sin personalizar desde el modulo response
    //res.send('Lista de mensajes');//Envia una respuesta al navegador
});

/*
//router.get('/',function(req,res){//añade la ruta / y hace algo.. toda función HTTP maneja dos parametros, una request y un responsive
//    console.log('router.get /');
//    res.send('Hola desde get/');//Envia una respuesta al navegador
//});

router.patch('/:id',function(req,res){//añade la ruta /, id de la ruta que queremos modificar y hace modificaciones parciales.. toda función HTTP maneja dos parametros, una request y un responsive
    console.log('patch => /message/:id');
    console.log('***req.params.id=',req.params.id);
    controller.updateMessage(req.params.id, req.body.message)
        .then((data) => {
            //respuesta
            response.success(req, res, data, 200);
        })
        .catch(e => {
            //respuesta
            response.error(req, res, 'Error interno', 500, e);
        });
    //res.send('ok');
});

router.delete('/:id',function(req,res){//añade la ruta /, id de la ruta que queremos modificar y hace modificaciones parciales.. toda función HTTP maneja dos parametros, una request y un responsive
    console.log('delete => /message/:id');
    console.log('***req.params.id=',req.params.id);
    controller.deleteMessage(req.params.id)
        .then(() => {
            //respuesta
            response.success(req, res, `Usuario ${req.params.id} eliminado`, 200);//Plantilla de ES6 para insertar mensajes
        })
        .catch(e => {//Pasamos el error para poderlo loggear
            //respuesta
            response.error(req, res, 'Error interno', 500, e);
        });   
});
*/

//console.log('C-network.js *** *** ***router=',router);







//EXPORTS
module.exports = router;//trae las rutas de cada componente (message, user, etc) y las exporta

/*04=>
networks.js MANEJADOR DE RUTAS, PERTENECE AL COMPONENTE: MENSAJE
1- Tiene todos los end points de los mensajes que tengan que ver con el servidor http
2- Recibe la información que le pasa el routes.js
3- Recibe peticiones http, procesa toda la información y se la envía al controlador
*/