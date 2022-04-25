
// va a ser la coneccion a la base de datos clientes

const mongoose = require('mongoose'),

     // creo un esquema para la coleccion
    /*ClienteSchema es un esquema en el que tendremos que definirle la estructura de datos (Schema) que contendra los diferentes objetos a almacenar */
    AjustesSchema = new mongoose.Schema({
        //el objet id no lo definimos por que ponemos uno propio, pero si no por defecto mongo te crea uno
        vendedores : "array",
        theme : "string",
        fecha_ultimo_ingreso : "date",
        ultimo_usuario: "string",
        categorias : "string"
    },
    {collection : "clientes"}),
    AjustesModel = mongoose.model("Ajustes", AjustesSchema) // Clientes va a representar el modelo de mongo para la conexion a la bd. el primer parametro es el nombre y el segundo el esquema en el que se basará

    
    const conf = require('./db-conf.json') // el archivo .json con la configuracion para conectarse a la base de datos
    mongoose.connect(`mongodb://${conf.mongo.host}/${conf.mongo.db}`)   // esta conexion se debe realizar una sola vez para todos los modelos. En este caso la dejo aqui en clientes-conexion y servirá para todos los modelos

    module.exports = AjustesModel