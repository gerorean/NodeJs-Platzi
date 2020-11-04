//MOC
const list = [];//Guarda todos los mensajes

//Añadir mensajes
function addMessage(message){//Recibe el mensaje que se ha generado anteriormente
    list.push(message);//Añade el mensaje al final de list
};

//Leer mensajes
function getMessage(){//
    return list;//Lista los mensajes de list
};

module.exports = {
    add: addMessage,
    list: getMessage,
    //get
    //update;
    //delete
}

/*
store.js PUENTE CON LAS BASES DE DATOS
1- Gestiona las bases de datos
2- Responsable de decir dónde y cómo se guarda la información
3- Lógica de almacenamiento
4- Requiere crear primero un MOC => es falsear la base de datos o un servicio para verificar que todo funciona correctamente
*/