const UserModel = require('../models/user-model.js')
const LoginController = () =>{
}

LoginController.showLogin = (req, res, next) =>{

    let locals = {
    }

    if(req.session){
        locals ={
            user : req.session.user
        }
    }

    res.render('login',locals) //renderizamos la vista cliente listado
}


LoginController.getOne = (req, res, next) =>{
    
    let userData = {
        usuario : req.body.usuario,
        contrasenia : req.body.contrasenia
    }

    UserModel.getOne(userData, (docs) =>{
        
        //aca iria toda la logica de la sesion. si hay algo en docs entonces crea la sesion y redirecciona.

        if(docs){
            let user = {
                usuario : docs.user,
                contrasenia : docs.contrasenia,
                email : docs.email,
                id : docs._id.toString(),
                foto : docs.foto
            }
            
            req.session.user = user

            let locals ={
                user : req.session.user
            }


            console.log("encontro el usuario")

            let response = {
                status : true
            }
            res.send(response)
            // res.render("index",locals) 
            
        }else{ //si no encontro el usuario en la bd redirecciona al login
            console.log("No encontro el usuario")
            let response = {
                status : false
            }
            res.send(response)
            //res.render('login')
        }
        

    })
        
    
    
}



LoginController.submit = (req, res, next) =>{


    let userData = {
        usuario : req.body.usuario,
        contrasenia : req.body.contrasenia
    }

    UserModel.getOne(userData, (docs) =>{

        if(docs){
            let user = {
                usuario : docs.user,
                contrasenia : docs.contrasenia,
                email : docs.email,
                id : docs._id.toString(),
                foto : docs.foto
            }
            
            req.session.user = user

            let locals ={
                user : req.session.user
            }

             res.render("index",locals) 
            
        }else{ //si no encontro el usuario en la bd redirecciona al login

            res.render('login')
        }
        

    })


}



module.exports = LoginController //exportamos el modulo completo.