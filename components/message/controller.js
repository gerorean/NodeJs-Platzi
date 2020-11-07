//Modulos
const store = require('./store');//Maneja la base de datos

//AÑADIR UN NUEVO MENSAJE:
function addMessage(chat, user,message){//Pasamos el usuario y el mesnsaje
    //Mensaje en el servidor
    console.log('user=',user);
    console.log('message=',message);
    //Si no viene el usuario o el mensaje, trabajamos con promesas:
    return new Promise((resolve,reject)=>{
        if(!chat || !user || !message){//Si no hay usuario o no hay mensaje, no guarde nada
            //Mensaje en el servidor
            console.error('[messageController] No hay usuario o mensaje');
            //return reject('Los datos son incorrectos');//return para que no siga ejecutando
            //Respuesta al usuario
            reject('Los datos son incorrectos');//Mensaje de salida en el navegador
            return false;//return para que no siga ejecutando
        }
        const fullMessage =  {
            chat:chat,
            user:user,
            message:message,
            date: new Date(),//adiciona la fecha
        };
        //Mensaje en el servidor
        console.log('- - fullMessage',fullMessage);
        store.add(fullMessage);//store.js => Guarda en la base de datos
        resolve(fullMessage);//Resuelve la promesa, retorna el resultado
    });
};

//TRAER LOS MENSAJES
function getMessages(filterChat){//Con filtro
//function getMessages(filterUser){//Con filtro
//function getMessages(){//
    //console.log('user=',user);
    return new Promise((resolve,reject)=>{
        resolve(store.list(filterChat));////store.js => Resuelve la promesa filtrada y retorna el resultado
        //resolve(store.list(filterUser));////store.js => Resuelve la promesa filtrada y retorna el resultado
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
        /*
        const fullMessage = {
            id:id,
            message:message,
            date: new Date(),//adiciona la fecha
        };
        console.log('- - fullMessage',fullMessage);
        */

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
//EXPORTS
module.exports = { //Exportamos un objeto con la función addMessage
    addMessage,
    getMessages,
    updateMessage,
    deleteMessage,
};

/*
controller.js CONTROLADOR, PERTENECE AL COMPONENTE: MENSAJE
1- Tiene toda la lógica del componente (Lógica del negocio)
2- si el mensaje necesita una fecha, hay se añade 
3- si el mensaje tiene que llamar a otro componente para hacer más cosas, también se hace aquí 
4- Modificar, cambiar, crear, añadir información, hacer comprobaciones, etc. todo se hace aquí
5- Define todo lo que sucede, creando las funciones necesarias
6- Recibe peticiones desde ./networks.js
*/