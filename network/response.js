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

exports.error = function(req,res,error,status){//Cuando algo vaya mal:
    res.status(status||500).send({//Respuesta personalizada como tercer parametro, tipo JSON con error vacío y si no viene el status asigna un 500
        error:error,
        body:''
    });
}