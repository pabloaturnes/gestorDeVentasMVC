const mongoose = require('mongoose'),
    
    UserSchema = new mongoose.Schema({
        user : "string",
        contrasenia : "string",
        email : "string",
        foto : "string",
        preguntaSecreta: "string",
        respuesta : "string"
    },
    {collection : "users"}),

    UserModel = mongoose.model("Users", UserSchema)

    module.exports = UserModel

