const ProductoModel = require('../models/producto-model.js')
const fs = require('fs').promises

const ProductoController = () =>{

}



ProductoController.mostrarListado = (req, res, next) =>{

    res.redirect('/producto-listado/pagina=1')

}

ProductoController.productoFormulario = (req,res,next) =>{

    let locals = {
        user : req.session.user
    }

    res.render('producto-agregar', locals)  // renderizamos la vista de cliente-formulario
}

ProductoController.save = (req,res,next) =>{

    let fotoUrl = ""

    if(req.file){  //si el usuario carga un archivo, la foto del producto sera igual al nuevo archivo y se borra el anterior
        fotoUrl = req.file.filename
        fs.unlink(`../gestion de ventas/public/uploads/${req.body.fotoActual}`)
        .then(() => {
            console.log('File removed')
        }).catch(err => {
            console.error('Something wrong happened removing the file', err)
        })
        
    }else{ //si no carga ningun archivo, la url sera la que tenia anteriormente y que esta cargada en el input hidden "fotoActual"
        fotoUrl = req.body.fotoActual
    }
    

    let producto = {  //objeto que recoje todos los datos que vienen del formulario
        producto_id : req.body.producto_id,
        nombre : req.body.nombre ,
        descripcion: req.body.descripcion ,
        precio: req.body.precio ,
        stock: req.body.stock ,
        foto: fotoUrl
    }

    ProductoModel.save(producto, ()=>{     //guardo datos en el modelo y redirecciono al listado
        res.redirect('/producto-listado/pagina=1')
    })

}

ProductoController.getOne = (req, res, next) =>{
    let producto_id = req.params.producto_id

    ProductoModel.getOne(producto_id, (docs) =>{

        let locals = {
            data : docs,
            user : req.session.user
        }

        res.render("producto-editar", locals)
    })
    
}

ProductoController.delete = (req, res, next) =>{
    let producto_id = req.params.producto_id

    ProductoModel.delete(producto_id , ()=>{
        res.redirect("/producto-listado/pagina=1")
    })

}

ProductoController.mostrarPagina = (req, res, next) =>{
    let pagina = parseInt(req.params.numero_pagina,10)   //si la variable de la queriystring pagina NO es 1, entonces pagina sera igual a PAGINA-1 (pagina luego es usado como limite para la consulta en la bd)

    

    ProductoModel.mostrarPagina(pagina, (docs,nextPage, previousPage, actualPage) =>{

        let locals = {
            data : docs,
            nextPage : nextPage,
            previousPage : previousPage,
            actualPage : actualPage,
            user: req.session.user
        }

        console.log(locals.actualPage)

        res.render("producto-listado", locals)
    })
    
}

ProductoController.mostrarBusqueda = (req, res, next) =>{
    let consulta = req.params.consulta

    ProductoModel.buscador(consulta, (docs) =>{

        let locals = {
            data : docs,
            user: req.session.user,
            pagination : "off"
        }

        res.render("producto-listado", locals)
    })
    
}

module.exports = ProductoController