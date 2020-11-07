//Modulos:
//const db = require('mongoose');//Trae Mongoose
const Model = require('./model');//Trae el modelo del chat

//Añadir chat
function addChat(chat){//Recibe el mensaje que se ha generado anteriormente
    console.log('*** chat=',chat);
    const myChat = new Model(chat);//Instancia una nueva clase del modelo, utiliza el modelo
    console.log('*** myChat=',myChat);
    return myChat.save();//Añade la info a mongoose
};

//Leer chats
function listChats(userId){
    return new Promise ((resolve, reject) => {
        let filter = {};//crea un filtro
        if(userId){
            filter = {
                users: userId,
            };//asigna valores al filtro
        }
        Model.find(filter)//Pide todos los documentos filtrados de forma sincrona, no hay que devolverla en ningnu sitio
        //const messages = Model.find(filter)//Pide todos los documentos filtrados de forma sincrona
            .populate('users')//Debemos popular la información, si esto hace referencia a otro dato, otra cosa, objeto de nuestra base de datos, la busca y trae toda la información viene de message/model.js => getMessages => message/store.js 
            .exec((err, populated)=>{//Ejecuta la función del populado => populated = información populada
                if (err){
                    reject(err);
                    return false;
                }
                resolve(populated);
            });
    });
};



//EXPORTS
module.exports = {
    add: addChat,
    list: listChats,
    //updateText: updateText,
    //remove: removeMessage,
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

