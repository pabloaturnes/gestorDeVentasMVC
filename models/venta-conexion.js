const mongoose = require('mongoose'),
    
    VentaSchema = new mongoose.Schema({
        idProductosVendidos : "array",
        cliente : "string",
        vendedor : "string",
        descuento : "number",
        total : "number",
        fecha : "date"
    },
    {collection : "venta"}),

    VentaModel = mongoose.model("Venta", VentaSchema)

    VentaSchema.index({ "$**": "text" }) //creamos un indice para la coleccion que incluya todos los campos y se llame text


    module.exports = VentaModel

