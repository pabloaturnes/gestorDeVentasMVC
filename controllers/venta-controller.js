const ProductoModel = require('../models/producto-model.js')
const VentaModel = require('../models/venta-model.js')
const VentaController = () =>{

}


VentaController.mostrarListado = (req, res, next) =>{

    res.redirect('/venta-listado/pagina=1')

}

VentaController.ventaFormulario = (req,res,next) =>{
    ProductoModel.getAll ( (docs) =>{
        let locals = {
            data : docs,
            user : req.session.user
        }

        res.render('venta-agregar', locals)  //renderizo la vista del formulario de ventas
    })
    
}

VentaController.save = (req,res,next) =>{

    let venta = { //objeto que recoje todos los datos que vienen de la peticion ajax
        idProductosVendidos : req.body.idProductosVendidos,
        cliente : req.body.cliente,
        vendedor : req.body.vendedor,
        descuento : req.body.descuento,
        total : req.body.total,
        fecha : req.body.fecha
    }

    console.log(venta.idProductosVendidos)
    venta.idProductosVendidos.forEach(id => {
        ProductoModel.updateStock(id)
    });


    VentaModel.save(venta, ()=>{
        res.redirect('/venta-listado')
    })

}

VentaController.mostrarTodos = (req,res,next) =>{

    VentaModel.getAll( (docs)=>{

        let locals = {
            data : docs,
            user : req.session.user
        }

        res.render('venta-listado', locals)
    })

}

VentaController.delete = (req,res,next) =>{

    let venta_id = req.params.venta_id

    VentaModel.delete( venta_id, ()=>{
        res.redirect('/venta-listado')
    })

}

VentaController.mostrarPagina = (req, res, next) =>{
    let pagina = parseInt(req.params.numero_pagina,10)   //si la variable de la queriystring pagina NO es 1, entonces pagina sera igual a PAGINA-1 (pagina luego es usado como limite para la consulta en la bd)

    
    VentaModel.mostrarPagina(pagina, (docs,nextPage, previousPage, actualPage) =>{

        let locals = {
            data : docs,
            nextPage : nextPage,
            previousPage : previousPage,
            actualPage : actualPage,
            user : req.session.user
        }

        console.log(locals.actualPage)

        res.render("venta-listado", locals)
    })
    
}


VentaController.mostrarBusqueda = (req, res, next) =>{
    let consulta = req.params.consulta

    VentaModel.buscador(consulta, (docs) =>{

        let locals = {
            data : docs,
            user: req.session.user,
            pagination: "off"
        }

        res.render("venta-listado", locals)
    })
    
}


module.exports = VentaController