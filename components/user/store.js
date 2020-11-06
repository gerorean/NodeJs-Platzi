//Modulos:
const Model = require('./model');//Trae el modelo del mensaje

//Añadir usuarios
function addUser(user){//Recibe el mensaje que se ha generado anteriormente
    console.log('*** user=',user);
    const myUser = new Model(user);//Instancia una nueva clase del modelo, utiliza el modelo
    console.log('*** myUser=',myUser);
    return myUser.save();//Retorna una promesa y añade la info a mongoose
};

//Listar usuarios
function listUsers(){
    return Model.find();//Devuelve una promesa que se va encargando hacia atrás
};


/*
//Leer mensajes
async function getMessages(filterUser){//función asincrona
//function getMessage(){//funcion sincrona
    let filter = {};//crea un filtro
    if(filterUser !== null){
        filter = {user: filterUser};//asigna valores al filtro
    }
    const messages = await Model.find(filter);//Pide todos los documentos filtrados de forma asincrona
    //const messages = await Model.find();//Pide todos los documentos de forma asincrona
    //const messages = Model.find();//Pide todos los documentos de forma sincrona
    return messages;//Retorna los mensajes y detiene el guión
    //return list;//Lista los mensajes de list
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
*/


//EXPORTS
module.exports = {
    add: addUser,
    list: listUsers,
    //list: getUser,
    //updateText: updateText,
    //remove: removeUser,
    //get
    //update;
    //delete
};

/*04=>
store.js PUENTE CON LAS BASES DE DATOS
1- Gestiona las bases de datos
2- Responsable de decir dónde y cómo se guarda la información
3- Lógica de almacenamiento
4- Requiere crear primero un MOC => es falsear la base de datos o un servicio para verificar que todo funciona correctamente
*/