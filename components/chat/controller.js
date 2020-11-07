//Modulos
const store = require('./store');//Maneja la base de datos

//AÑADIR UN NUEVO MENSAJE:
function addChat(users){//Pasamos el usuario y el mensaje
    //Mensaje en el servidor
    console.log('users=',users);
    //Si no necesitamos la promesa completa porque ya va a devolver una, devolvemos un return Promise.reject()
    if(!users || !Array.isArray(users)){//Si no hay usuario o no hay mensaje, no guarde nada
        //Mensaje en el servidor
        console.error('[chat Controller] No hay users o arreglo de usuarios');
        return Promise.reject('Invalid User list');
    }
    console.log('- - [controller] const chat');
    const chat =  {
        //name,
        users:users,
    };
    console.log('- - [controller] const chat =',chat);
    //Mensaje en el servidor
    //console.log('- - fullMessage',fullMessage);
    return store.add(chat);//store.js => Guarda en la base de datos, y devuelve una promesa??
};

//TRAER LISTA DE USUARIOS
function listChats(userId){
    return store.list(userId);//store.js => Resuelve la promesa y retorna el resultado
};//Retorna una promesa por si algo falla




/*
//TRAER LOS USUARIOS
function getMessages(filterUser){//Con filtro
//function getMessages(){//
    //console.log('user=',user);
    return new Promise((resolve,reject)=>{
        resolve(store.list(filterUser));////store.js => Resuelve la promesa filtrada y retorna el resultado
        //resolve(store.list());////store.js => Resuelve la promesa y retorna el resultado
        //Respuesta al usuario
        reject();
    });//Retorna una promesa por si algo falla
};

//ACTUALIZAR UN MENSAJE DADO SU id
function updateMessage(id, message){
    return new Promise(async (resolve,reject) => {
        console.log('id=',id,', message=',message);
        if(!id || !message){
            //Mensaje en el servidor
            console.error('[messageController] No hay id o mensaje');
            //Respuesta al usuario
            reject('invalid data');
            return false;
        }
        
        //const fullMessage = {
        //    id:id,
        //    message:message,
        //    date: new Date(),//adiciona la fecha
        //};
        //console.log('- - fullMessage',fullMessage);
        

        const result = await store.updateText(id, message);//store.js => Actualiza el mensaje en la base de datos
        resolve(result);//Resuelve la promesa, retorna el resultado
        //reject();
    });//Retorna una promesa por si algo falla
};

//BORRAR UN MENSAJE DADO SU id
function deleteMessage(id){
    return new Promise(async (resolve,reject) => {
        console.log('id=',id);
        if(!id){
            //Mensaje en el servidor
            console.error('[messageController] No hay id');
            //Respuesta al usuario
            reject('Id invalido');
            return false;
        }
        store.remove(id)
            .then(() => {
                resolve();
            })
            .catch(e => {
                reject(e);
            });
    });
}
*/




//EXPORTS
module.exports = { //Exportamos un objeto con la función addMessage
    addChat,
    listChats,
    //getUsers,
    //updateUser,
    //deleteUser,
};


/*03=>
controller.js CONTROLADOR, PERTENECE AL COMPONENTE: MENSAJE
1- Tiene toda la lógica del componente (Lógica del negocio)
2- si el mensaje necesita una fecha, hay se añade 
3- si el mensaje tiene que llamar a otro componente para hacer más cosas, también se hace aquí 
4- Modificar, cambiar, crear, añadir información, hacer comprobaciones, etc. todo se hace aquí
5- Define todo lo que sucede, creando las funciones necesarias
6- Recibe peticiones desde ./networks.js
*/