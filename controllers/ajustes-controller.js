
const AjustesModel = require('../models/ajustes-model')  //Importa el objeto ClienteModel con todas sus funciones

const AjustesController = () =>{
}


AjustesController.ajustesFormulario = (req,res,next) =>{
    let locals = {
        user : req.session.user
    }
    res.render('ajustes', locals)  // renderizamos la vista de cliente-formulario
}


module.exports = AjustesController //exportamos el modulo completo.