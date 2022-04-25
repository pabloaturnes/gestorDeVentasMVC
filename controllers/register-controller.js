const UserModel = require('../models/user-model.js')
const fs = require('fs').promises
const RegisterController = () =>{
}

RegisterController.showRegister = (req, res, next) =>{
    
    res.render('usuario-registrar') //renderizamos la vista cliente listado
    
}

RegisterController.save = (req,res,next) =>{

    let fotoUrl = ""

    if(req.file){  //si el usuario carga un archivo, la foto del usuario sera igual al nuevo archivo y se borra el anterior
        fotoUrl = req.file.filename
    }else{ //si no carga ningun archivo, por defecto se le pondra el la foto de desconocido
        fotoUrl = "../images/desconocido.png"
    }



    let usuario = {  //objeto que recoje todos los datos que vienen del formulario
        user : req.body.usuario,
        contrasenia : req.body.contrasenia ,
        email: req.body.email,
        foto : fotoUrl,
        preguntaSecreta: req.body.preguntaSecreta,
        respuesta : req.body.respuesta
    }

    UserModel.save(usuario, ()=>{     //guardo datos en el modelo y redirecciono al listado
        console.log(usuario)

        let response = {
            status : true
        }
        res.send(response)

    })

}

RegisterController.buscarUsuario = (req, res, next) =>{
    
    let usuario = req.body
        UserModel.getUser(usuario, (docs)=>{     //guardo datos en el modelo y redirecciono al listado
            let data = {
                usuario : docs
            }
            res.send(data)
    })

}

module.exports = RegisterController //exportamos el modulo completo.

