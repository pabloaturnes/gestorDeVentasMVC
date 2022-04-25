
const IndexController = require('../controllers/index-controller'),
    ClienteController = require('../controllers/cliente-controller'),
    ProductoController = require('../controllers/producto-controller'),
    LoginController = require('../controllers/login-controller'),
    RegisterController = require('../controllers/register-controller'),
    VentaController = require('../controllers/venta-controller'),
    AjustesController = require('../controllers/ajustes-controller'),
    SalirController = require('../controllers/salir-controller'),
    SessionExists = require('../controllers/sessionExists'), //middleware creado por nosotros para corroborar si existe una sesion iniciada, si no, redirecciona
    mimeTypes = require('mime-types'),   //middleware para manejar extension de archivos
    multer  = require('multer'),  //middleware para manejar archivos en express
    storage = multer.diskStorage({    //funcion de multer que sirve para relocalizar y renombrar archivos
        destination : 'public/uploads/',
        filename : function(req,file,cb){
            cb("", Date.now() + "." + mimeTypes.extension(file.mimetype))
        }
    }),
    upload = multer({ storage: storage }), //funcion de multer que sirve para relocalizar y renombrar archivos
    express = require('express'),
    router = express.Router()


//Ruta que muestra el index de nuestra app

router.get('/', SessionExists, IndexController.showIndex)


//Rutas y acciones relacionadas a clientes

router.get('/cliente-listado', SessionExists, ClienteController.mostrarListado)

router.get('/cliente-listado/pagina=:numero_pagina', SessionExists, ClienteController.mostrarPagina) 

router.get('/cliente-listado/search=:consulta', SessionExists, ClienteController.mostrarBusqueda) 

router.get('/cliente-formulario', SessionExists, ClienteController.clienteFormulario)

router.get('/cliente-editar/:cliente_id', SessionExists, ClienteController.getOne)

router.put('/cliente-editar/actualizar/:cliente_id', SessionExists, ClienteController.save)

router.post('/cliente-formulario', SessionExists,  ClienteController.save)

router.delete('/eliminar/cliente/:cliente_id', SessionExists, ClienteController.delete)


// Rutas y acciones relacionadas a Productos

router.get('/producto-listado', SessionExists, ProductoController.mostrarListado)

router.get('/producto-listado/pagina=:numero_pagina', SessionExists, ProductoController.mostrarPagina)

router.get('/producto-listado/search=:consulta', SessionExists, ProductoController.mostrarBusqueda) 

router.get('/producto-formulario', SessionExists, ProductoController.productoFormulario)

router.get('/producto-editar/:producto_id', SessionExists, ProductoController.getOne)

router.post('/producto-editar/actualizar/:producto_id', SessionExists, upload.single('archivo'), ProductoController.save) // se llama al middleware a traves de upload para trabajar archivos

router.post('/producto-formulario', SessionExists, upload.single('archivo'), ProductoController.save)  //se llama al middleware a traves de upload para trabajar archivos

router.delete('/eliminar/producto/:producto_id', SessionExists, ProductoController.delete)


// Rutas y acciones relacionadas a Ventas

router.get('/venta-listado', SessionExists, VentaController.mostrarListado)

router.get('/venta-listado/pagina=:numero_pagina', SessionExists, VentaController.mostrarPagina) 

router.get('/venta-listado/search=:consulta', SessionExists, VentaController.mostrarBusqueda) 

router.get('/venta-formulario', SessionExists, VentaController.ventaFormulario)

router.post('/venta-formulario', SessionExists, VentaController.save)

router.delete('/eliminar/venta/:venta_id', SessionExists, VentaController.delete)


//rutas y acciones relacionadas a register, login y logout

router.get('/login', LoginController.showLogin)

router.post('/login', LoginController.submit)

router.get('/registrar', RegisterController.showRegister)

router.post('/registrar', upload.single('foto'), RegisterController.save)

router.get('/salir', SessionExists, SalirController.Logout)

//rutas y acciones relacionadas a ajustes

router.get('/ajustes', AjustesController.ajustesFormulario)

//rutas y acciones relacionadas a peticiones ajax

router.post('/clientes', ClienteController.traerTodos)
router.post('/usuarios', RegisterController.buscarUsuario)
router.post('/login-usuario', LoginController.getOne)


module.exports = router