//Servidor de respuestas:
//Network => Todas las partes de la capa de red, modulo que se encarga de responder a todas las peticiones:

exports.success = function(req,res,message,status){//Cuando algo vaya bien más tercer parámetro y status
//exports.success = function(req,res,message){//Cuando algo vaya bien más tercer parametro
//exports.success = function(req,res){//Cuando algo vaya bien:
    res.status(status||200).send({//Respuesta personalizada como tercer parametro, tipo JSON con error vacío y si no viene el status asigna un 200
        //res.send({//Respuesta personalizada como tercer parametro, tipo JSON con error vacío
        error:'',
        body:message
    });
    //res.send(message);//Respuesta personalizada como tercer parametro
    //res.send('Primera respuesta');//Respuesta sin personalizar
}

exports.error = function(req,res,error,status,details){//Cuando algo vaya mal:
    console.error('[response error] ',details);//Permite tener un log - registro con una etiqueta del error con detalles de lo que ha sucedido y el usuario no se entera, el servidor si
    //console.error(details);//Permite tener un log - registro del error con detalles de lo que ha sucedido y el usuario no se entera, el servidor si
    res.status(status||500).send({//Respuesta personalizada como tercer parametro, tipo JSON con error vacío y si no viene el status asigna un 500
        error:error,
        body:''
    });
}

/*
response.js MANEJADOR DE RESPUESTAS
1- cada vez que una petición sea correcta, el modulo http en lugar de devolverlo al router se lo pasa al response.js
2- responde al cliente final
3- se asegura que siempre las peticiones que llegan tengan la misma forma y el mismo sentido


*/