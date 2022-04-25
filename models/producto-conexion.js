
// coneccion con la base de datos clientes

const mongoose = require('mongoose'),
    
    ProductoSchema = new mongoose.Schema({
        producto_id : "string",
        nombre : "string",
        descripcion : "string",
        stock : "number",
        precio : "number",
        foto : "string"
    },
    {collection : "producto"}),

    ProductoModel = mongoose.model("Producto", ProductoSchema)

    ProductoSchema.index({ "$**": "text" }) //creamos un indice para la coleccion que incluya todos los campos y se llame text

    module.exports = ProductoModel