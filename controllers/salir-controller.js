
const SalirController = () =>{

}


SalirController.Logout = (req,res,next) =>{
    
    
}

SalirController.Logout = (req, res, next) =>{

    delete req.session.user
    res.redirect("/login")
    
}

module.exports = SalirController       //exporto el prototipo IndexController para que pueda ser usado en otra parte del codigo
