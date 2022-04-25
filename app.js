
//importamos todos los modulos que requiere la aplicacion

const express = require('express'),
    favicon = require('serve-favicon'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    restFull = require('express-method-override')('_method'),
    pug = require('pug'),
    multer = require('multer'),
    session = require('express-session'),
    routes = require('./routes/app-router'),
    faviconURL = `${__dirname}/public/images/favicon.png`,
    publicDir = express.static(`${__dirname}/public`),
    viewDir = `${__dirname}/views`,
    port = (process.env.PORT || 3000),
    app = express()
    
    // configuracion de la aplicacion

    app.set('views', viewDir)
    app.set('view engine', 'pug')
    app.set('port', port)

    // ejecucion de middlewares

    app.use( favicon(faviconURL) )
    app.use( bodyParser.json() )
    app.use( bodyParser.urlencoded({extended:false}) )
    app.use(restFull)
    app.use(session({      //configuracion de la sesion ( definida como un espacio de memoria almacenada en el servidor que podemos compartir entre multiples paginas)
        saveUninitialized : false,
        resave : false,
        secret : "secreto"
    }))
    app.use(morgan('dev'))
    app.use(publicDir)

    //middleware enrutador
    app.use(routes)

    module.exports = app