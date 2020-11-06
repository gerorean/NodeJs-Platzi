//Modulos:
const mongoose = require('mongoose');//Trae Mongoose

//Objetos, clases:
const Schema = mongoose.Schema;//Crea la clase esquema, se va a utlizar mucho, por eso se separa

//1- ESQUEMA
const mySchema = new Schema({//Define el esquema
    users: [//Array, lista de objetos
        type: Schema.ObjectId,
        ref: 'User',//Debemos popular la información, si esto hace referencia a otro dato, otra cosa, objeto de nuestra base de datos, la busca y trae toda la información => store.js => getMessages
    ]
});

//2- MODELO
const model = mongoose.model('Chat', mySchema);//Define el nombre de la colección en Mongo, y en el segundo el Esquema que le hemos pasado

//EXPORTS
module.exports = model;

/*
model.js MODELO DE LA BASE DE DATOS
1- Crea esquemas por codigo para la base de datos y los define
2- Valida los datos, si no validan no los guarda en la base de datos
3- Esquemas de mongoose: atravez de un objeto permite definir todas las propiedades y los tipos
4- Modelos de mongoose: Reviza que todo lo que se cree tenga el esquema X y se guarde en la base de datos bajo el nombre Y del modelo
*/