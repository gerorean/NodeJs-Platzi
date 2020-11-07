//Modulos:
//const express = require ('express');//(ES6)import express form 'express'; ->Servidor rápido
const message = require ('../components/message/network');//trae los métodos del message
const user = require ('../components/user/network');//trae los métodos del user
const chat = require ('../components/chat/network');//trae los métodos del chat

//AQUI VAN A VENIR TODAS LAS RUTAS:
const routes = function(server){//Función que trae todas las rutas, se le pasa el servidor de express:
    //console.log('A-routes.js *** *** ***server=',server);
    //console.log('B-routes.js *** *** ***message=',message);
    server.use('/message', message);//Por cada ruta, asigna una función, en esta caso la ruta se llama message, cada vez que las rutas llamen a message, llama al componente message y lo realiza => router.get('/message',function(req,res){}
    server.use('/user', user);//Por cada ruta, asigna una función, en esta caso la ruta se llama user, cada vez que las rutas llamen a user, llama al componente user y lo realiza => router.get('/user',function(req,res){}
    server.use('/chat', chat);//Por cada ruta, asigna una función, en esta caso la ruta se llama user, cada vez que las rutas llamen a user, llama al componente user y lo realiza => router.get('/user',function(req,res){}
}

//EXPORTS
module.exports = routes;
/*
routes.js => MANEJADOR/SERVIDOR DE RUTAS - ROUTER
Se encarga de:
1- Recibe la información del SERVIDOR
2- Gestiona las rutas.
3- Ver hacia donde quiere ir la petición y va a llamar al componente adecuado.
4- Si llega otro componente, esta es la forma de importar todos los routes en un solo archivo
5- Maneja toda la información del Router en un archivo separado
*/