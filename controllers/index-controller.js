// se encargara de conectar el modelo (base de datos) con las vistas

const IndexController = () =>{

}

IndexController.showIndex = (req,res,next) =>{

    let locals = {
        user :  req.session.user
    }

    console.log(locals)

    res.render('index',locals)  //renderizamos la vista index

}


module.exports = IndexController       //exporto el prototipo IndexController para que pueda ser usado en otra parte del codigo
