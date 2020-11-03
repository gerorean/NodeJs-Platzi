//instalaciones:
//npm install express           // npm i express
//node server
//sudo npm install nodemon      // nodemon --version
//nodemon server                =>reinicia el servidor con cada cambio que sea guardado
//npm i body-parser             =>permite trabajar con el body de la petición

//Modulos:
const express = require ('express');//(ES6)import express form 'express'; ->Servidor rápido
const bodyParser = require('body-parser');//Maneja el body de la petición
const response = require('./network/response');//Maneja las respuestas de las peticiones cuando van bien y cuando van mal

//Objetos:
const router = express.Router();//Maneja las peticiones (Requests), las cabeceras
var app = express();//Inicializa - añade el servidor
app.use(bodyParser.json());//añade el manejador JSON del cuerpo de la petición, convierte los JSON en objetos de JavaScript  => el body siempre lo encontramos en la request => req.body, para ver el cuerpo se necesita metódo manejador de JSON
app.use(bodyParser.urlencoded({extended:false}));//igual que el anterior pero en vez de JSON va a maneja urlencode en el body, esta es opcional, convierte los urlEncoded en objetos de JavaScript ..
app.use(router);//añade el router a la aplicación de express

//Rutas que queremos que escuche para cada uno de los metódos:
router.get('/message',function(req,res){//añade la ruta / y hace algo.. toda función HTTP maneja dos parametros, una request y un responsive
    console.log('req.header=',req.headers);//Leer cabeceras del req
    res.header({'custom-header':'Nuestro valor personalizado',});//Cabecera personalizada => ver Headers de la res en Postman
    console.log('res.header=',res.header);//Leer cabeceras del res
    console.log('body=',req.body);
    console.log('query=',req.query);//get localhost:3000/message?orderBy=Id
    console.log('get /message');
    response.success(req,res,'Lista de mensajes');//Respuesta exitosa personalizada desde el modulo response
    //response.success(req,res);//Responde exitosamente sin personalizar desde el modulo response
    //res.send('Lista de mensajes');//Envia una respuesta al navegador
});
router.post('/message',function(req,res){//añade la ruta / y hace algo.. toda función HTTP maneja dos parametros, una request y un responsive
    console.log('body=',req.body);//consultas por el body => se usa mucho cache-control, para cache espesificos de imagenes, archivos; user-agent para tipo de navegador
    console.log('query=',req.query);//consultas por query - post localhost:3000/message?orderBy=Idi - - - localhost:3000/message?orderBy=Idi&age=15
    console.log('post /message');
    if (req.query.error == 'ok'){//Simular un error desde query => Post localhost:3000/message?error=ok
        //response.error(req,res,'Error simulado');//Respuesta exitosa personalizada desde el modulo response sin status
        response.error(req,res,'Error simulado',401);//Respuesta exitosa personalizada desde el modulo response con status
        //response.error(req,res,'Error simulado',400);//Respuesta exitosa personalizada desde el modulo response con status
    }
    else{
        response.success(req,res,'Creado correctamente',201);//Respuesta exitosa personalizada desde el modulo response   
    }
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

//app.use('/',function(req,res){//añade la ruta / y hace algo.. toda función HTTP maneja dos parametros, una request y un responsive
//    console.log('app.use /');  
//    res.send('Hola desde cualquiera');//Envia una respuesta al navegador
//})

app.listen(3000);//Servidor escucha en el puerto
console.log('La aplicación esta escuchando en el puerto http://localhost:3000');//Salida por consola