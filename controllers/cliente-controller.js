
const ClienteModel = require('../models/cliente-model')  //Importa el objeto ClienteModel con todas sus funciones
const ClienteController = () =>{
}

ClienteController.mostrarTodos = (req, res,next) =>{

    ClienteModel.getAll( (docs) =>{
        console.log(docs)

        let locals = {
           data : docs 
        } 
        res.render('cliente-listado', locals) //renderizamos la vista cliente listado
    })
    
}

ClienteController.traerTodos = (req, res,next) =>{

    ClienteModel.getAll( (docs) =>{


        res.send(docs) //enviamos la lista de clientes de respuesta
    })

}

ClienteController.mostrarListado = (req, res, next) =>{

    res.redirect('/cliente-listado/pagina=1')

}


ClienteController.clienteFormulario = (req,res,next) =>{
    let locals = {
        user : req.session.user
    }
    res.render('cliente-agregar', locals)  // renderizamos la vista de cliente-formulario
}

ClienteController.save = (req,res,next) =>{
    let cliente = {  //objeto que recoje todos los datos que vienen del formulario
        cliente_id : req.body.cliente_id,
        nombre : req.body.nombre ,
        apellido: req.body.apellido ,
        dni: req.body.dni ,
        telefono: req.body.telefono ,
        email: req.body.email ,
        direccion: req.body.direccion ,
        provincia: req.body.provincia
    }

    ClienteModel.save(cliente, ()=>{     //guardo datos en el modelo y redirecciono al listado
        res.redirect('/cliente-listado')
    })

}

ClienteController.delete = (req, res, next) =>{
    let cliente_id = req.params.cliente_id
    ClienteModel.delete(cliente_id, ()=>{
        res.redirect('/cliente-listado')
    })
}

ClienteController.getOne = (req, res, next) =>{
    let cliente_id = req.params.cliente_id
    ClienteModel.getOne(cliente_id, (docs)=>{
        let locals = {
            data: docs,
            user : req.session.user
        }
        res.render('cliente-editar', locals)
    })
}


ClienteController.mostrarPagina = (req, res, next) =>{
    let pagina = parseInt(req.params.numero_pagina,10)   //si la variable de la queriystring pagina NO es 1, entonces pagina sera igual a PAGINA-1 (pagina luego es usado como limite para la consulta en la bd)

    ClienteModel.mostrarPagina(pagina, (docs,nextPage, previousPage, actualPage) =>{

        let locals = {
            data : docs,
            nextPage : nextPage,
            previousPage : previousPage,
            actualPage : actualPage,
            user : req.session.user
        }

        res.render("cliente-listado", locals)
    })
    
}


ClienteController.mostrarBusqueda = (req, res, next) =>{
    let consulta = req.params.consulta

    ClienteModel.buscador(consulta, (docs) =>{

        let locals = {
            data : docs,
            user: req.session.user,
            pagination : "off"
        }

        res.render("cliente-listado", locals)
    })
    
}


module.exports = ClienteController //exportamos el modulo completo.