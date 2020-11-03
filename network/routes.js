//Servidor de rutas: si mañana tengo otro componente, esta es la forma de importar todos los routes en un solo archivo:
//Maneja toda la información del Router en un archivo separado:

//Modulos:
const express = require ('express');//(ES6)import express form 'express'; ->Servidor rápido
const message = require ('../components/message/network');//trae el método del message

//AQUI VAN A VENIR TODAS LAS RUTAS:
const routes = function(server){//Función que trae todas las rutas, se le pasa el servidor de express:
    //console.log('A-routes.js *** *** ***server=',server);
    //console.log('B-routes.js *** *** ***message=',message);
    server.use('/message', message);//Por cada ruta, asigna una función, en esta caso la ruta se llama message, cada vez que las rutas llamen a message, llama al componente message y lo realiza => router.get('/message',function(req,res){}
}

module.exports = routes;