//Modulos
const store = require('./store');//Maneja la base de datos

//AÑADIR UN NUEVO MENSAJE:
function addMessage(user,message){//Pasamos el usuario y el mesnsaje
    console.log('user=',user);
    console.log('message=',message);
    //Si no viene el usuario o el mensaje, trabajamos con promesas:
    return new Promise((resolve,reject)=>{
        if(!user||!message){//Si no hay usuario o no hay mensaje, no guarde nada
            console.error('[messageController] No hay usuario o mensaje');
            //return reject('Los datos son incorrectos');//return para que no siga ejecutando
            reject('Los datos son incorrectos');//Mensaje de salida en el navegador
            return false;//return para que no siga ejecutando
        }
        const fullMessage =  {
            user:user,
            message:message,
            date:new Date(),//adiciona la fecha
        };
        console.log('- - fullMessage',fullMessage);
        store.add(fullMessage);//Guarda en la base de datos
        resolve(fullMessage);//Resuelve la promesa, retorna el resultado
    });
};

//TRAER LOS MENSAJES:
function getMessages(){//
    //console.log('user=',user);
    return new Promise((resolve,reject)=>{
        resolve(store.list());
        reject();
    });//Retorna una promesa por si algo falla
}
    


module.exports = { //Exportamos un objeto con la función addMessage
    addMessage,
    getMessages,
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