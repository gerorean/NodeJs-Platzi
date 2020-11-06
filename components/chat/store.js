//Modulos:
//const db = require('mongoose');//Trae Mongoose
const Model = require('./model');//Trae el modelo del mensaje

////URL
//const DB_USER = 'rodrigo';
//const DB_PASSWORD= 'tele1234';
//const DB_HOST= 'cluster0.38nlt.gcp.mongodb.net';
//const DB_NAME= 'telegram';
//mongodb://user:user1234@aaa.bbb.com:aaaa/telegram //URL Base de datos
//const url1 = 'mongodb+srv://'+DB_USER+':'+DB_PASSWORD+'@'+DB_HOST+'/'+DB_NAME;
//console.log('url1=',url1);
//const url2 = 'mongodb://localhost:27017/telegram';
//console.log('url2=',url2);

////Manejo de promesas en mongoose:
//db.Promise = global.Promise;//Global objeto de nodeJs para acceder al scope global; la clase Promise, es una clase nativa de JS moderna para manejar promesas 
//
////MongoClient constructor:
//db.connect(url2,{//Use cualquiera de las 2 url: localhost o mongodb.net
////db.connect((url1 || url2),{//Use cualquiera de las 2 url: localhost o mongodb.net
//    useNewUrlParser:true,//Use el nuevo parser de MongoDb, soluciona problemas de compatibilidad
//    useUnifiedTopology:true,//Soluciona aviso de DeprecationWarning, ver Nota A
//});

//console.log('[db] Conectada con éxito');

//MOC?
//const list = [];//Guarda todos los mensajes

//Añadir mensajes
function addMessage(message){//Recibe el mensaje que se ha generado anteriormente
    //list.push(message);//Añade el mensaje al final de list (Array)
    console.log('*** message=',message);
    const myMessage = new Model(message);//Instancia una nueva clase del modelo, utiliza el modelo
    console.log('*** myMessage=',myMessage);
    myMessage.save();//Añade la info a mongoose
};

//Leer mensajes
async function getMessages(filterUser){//función asincrona
    return new Promise ((resolve, reject) => {
        let filter = {};//crea un filtro
        if(filterUser !== null){
            filter = {user: filterUser};//asigna valores al filtro
        }
        Model.find(filter)//Pide todos los documentos filtrados de forma sincrona, no hay que devolverla en ningnu sitio
        //const messages = Model.find(filter)//Pide todos los documentos filtrados de forma sincrona
            .populate('user')//Debemos popular la información, si esto hace referencia a otro dato, otra cosa, objeto de nuestra base de datos, la busca y trae toda la información viene de message/model.js => getMessages => message/store.js 
            .exec((error, populated)=>{//Ejecuta la función del populado => populated = información populada
                if (error){
                    reject(error);
                    return false;
                }
                resolve(populated);
            })
            //Cuando se ejecuta excec no se necesita catch aquí
            /*.catch(e => {
                reject(e)
            })*/
            ;
        //resolve(messages);//Retorna los mensajes y detiene el guión
    })
    ////let filter = {};//crea un filtro
    ////if(filterUser !== null){
    ////    filter = {user: filterUser};//asigna valores al filtro
    ////}
    ////const messages = Model.find(filter);//Pide todos los documentos filtrados de forma sincrona
    //////const messages = await Model.find(filter);//Pide todos los documentos filtrados de forma asincrona
    //////const messages = await Model.find();//Pide todos los documentos de forma asincrona
    //////const messages = Model.find();//Pide todos los documentos de forma sincrona
    ////return messages;//Retorna los mensajes y detiene el guión
    //////return list;//Lista los mensajes de list
};

//Actualizar mensajes
async function updateText(id, message){//función asincrona
//function getMessage(){//funcion sincrona 
    //const messages = Model.find();//Pide todos los documentos de forma sincrona
    const foundMessage = await Model.findOne({
        _id:id,
    });//Pide todos los documentos de forma asincrona

    foundMessage.message = message;
    const newMessage = await foundMessage.save();
    return newMessage;//Retorna el mensaje actualizado y detiene el guión
        //return list;//Lista los mensajes de list
};

//Eliminar mensajes
function removeMessage(id){//función sincrona
    return Model.deleteOne({//Model devuelve una promesa
        _id:id,
    });
}

//EXPORTS
module.exports = {
    add: addMessage,
    list: getMessages,
    updateText: updateText,
    remove: removeMessage,
    //get
    //update;
    //delete
};

/*
store.js PUENTE CON LAS BASES DE DATOS
1- Gestiona las bases de datos
2- Responsable de decir dónde y cómo se guarda la información
3- Lógica de almacenamiento
4- Requiere crear primero un MOC => es falsear la base de datos o un servicio para verificar que todo funciona correctamente
*/

