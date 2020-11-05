//Modulos:
const db = require('mongoose');//Trae Mongoose

//Manejo de promesas en mongoose:
db.Promise = global.Promise;//Global objeto de nodeJs para acceder al scope global; la clase Promise, es una clase nativa de JS moderna para manejar promesas 

async function connect(url){//Crea la conexión con la BD
    //MongoClient constructor:
    await db.connect(url,{//Use la url: localhost o mongodb.net
    //db.connect(url,{//Use cualquiera de las 2 url: localhost o mongodb.net
        //db.connect((url1 || url),{//Use cualquiera de las 2 url: localhost o mongodb.net
        useNewUrlParser:true,//Use el nuevo parser de MongoDb, soluciona problemas de compatibilidad
        useUnifiedTopology:true,//Soluciona aviso de DeprecationWarning, ver Nota A
    });
    console.log('[db] Conectada con éxito');//*A*
}//El async - await que añadimos permite asegurar que cuando se loggee *A*, se ha conectado correctamente

//EXPORTS
module.exports = connect;



/*
db.js => COMPARTE LA CONEXION CON LA BD
1- ELIGE CUANDO CREAR LA CONEXIÓN CON LA BASE DE DATOS
*/