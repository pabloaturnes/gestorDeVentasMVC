
const SessionExists = (req, res, next) =>{
    if(req.session.user){
        next()
    }else{
        res.redirect("/login")
    }
    
}

module.exports = SessionExists       //exporto el prototipo IndexController para que pueda ser usado en otra parte del codigo
