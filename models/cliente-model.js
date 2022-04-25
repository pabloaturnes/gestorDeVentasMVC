const connection = require('./cliente-conexion'),
    ClienteModel = () =>{

    }


ClienteModel.getAll = (cb) =>{  //funcion que trae todos los clientes
    connection
        .find() // trae todos los objetos dentro de la bd clientes
        .exec( (err,docs) =>{// una expresion regular que ejecutara una callback. Puede recibir un error de la peticion find o si todo esta ok recibe los datos
        if(err) throw err // si hay error va a arrojarlo
        cb(docs)
    })
}      


ClienteModel.save = (data,cb) =>{  //funcion que guardara o actualizara los datos

    connection
        .count( {cliente_id : data.cliente_id}) // la funcion count() de mongoose recibe un criterio de busqueda como parametro. en este caso pregunta si hay un id igual al id del objeto ingresado
        .exec( (err,count) =>{

            if(err) throw err //erroja el error
            console.log(count)

            if(count == 0){

                connection.create(data , (err)=>{
                    if(err) throw err //si hay error lo arroja
                    cb() //si no hay error ejecuta la callback que viene como parametro desde el controlador
                })
            }else if(count ==  1){ // si count es uno significa que ya hay un cliente con ese id

                connection.findOneAndUpdate(
                    {cliente_id : data.cliente_id},
                    {
                        nombre : data.nombre,
                        apellido: data.apellido,
                        dni : data.dni,
                        telefono : data.telefono,
                        email : data.email,
                        direccion : data.direccion,
                        provincia : data.provincia
                    },
                    (err) =>{  //actualiza un registro, la funcion recibe como parametros la condicion (objeto), los datos a actualizar (objeto) y  una callback. (la condicion en este caso es que busque el id = a cliente_id)
                        if(err) throw err //si hay error lo arroja
                        cb()    // si no hay erro ejecuta la callback que le pasamos como parametro en el modelo y que viene desde el controlador
                    }
                )
            }
        })
}

ClienteModel.delete = (id, cb) =>{
    connection.remove( {cliente_id : id}, (err,docs) =>{
        if(err) throw err
        cb()
    })
}

ClienteModel.getOne = (id, cb) =>{
    connection
        .findOne( {cliente_id : id} )
        .exec( (err,docs)=>{
            if(err) throw err
            cb(docs)
        })
}

ClienteModel.mostrarPagina = (page,cb) =>{

    let limit = ""
    let previousPage = ""
    let nextPage = ""
    let actualPage = page

    if(page == 1){
        limit = 0
    }else{
        limit = page-1
        previousPage = `http://localhost:3000/cliente-listado/pagina=${page-1}`
    }

    connection
        .find().limit(10).skip(limit*10)
        .exec( (err,docs)=>{
            if(err) throw err

            if(docs.length >= 10){
                nextPage = `http://localhost:3000/cliente-listado/pagina=${page+1}`
            }

            cb(docs,nextPage,previousPage,actualPage)
        })
}



ClienteModel.buscador = (consulta, cb) =>{

        
    connection
        .find({ $text : { $search: consulta, $caseSensitive:false } })
        .exec( (err,docs) =>{
            if(err) throw err
            console.log(docs)
            cb(docs)
        })
    
}


module.exports = ClienteModel       //exporto el prototipo movie para que pueda ser usado en otra parte del codigo
