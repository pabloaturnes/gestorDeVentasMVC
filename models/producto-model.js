const connection = require('./producto-conexion'),
    ProductoModel = () =>{

    }


    ProductoModel.getAll = (cb) =>{
        connection
            .find()
            .exec( (err,docs) =>{
                if(err) throw err
                cb(docs)
            })
    }

    ProductoModel.save = (data, cb) =>{

        connection
        .count( {producto_id : data.producto_id}) // la funcion count() de mongoose recibe un criterio de busqueda como parametro. en este caso pregunta si hay un id igual al id del objeto ingresado
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
                    {producto_id : data.producto_id},
                    {
                        nombre : data.nombre,
                        descripcion: data.descripcion,
                        precio : data.precio,
                        stock : data.stock,
                        foto : data.foto
                    },
                    (err) =>{  //actualiza un registro, la funcion recibe como parametros la condicion (objeto), los datos a actualizar (objeto) y  una callback. (la condicion en este caso es que busque el id = a cliente_id)
                        if(err) throw err //si hay error lo arroja
                        cb()    // si no hay erro ejecuta la callback que le pasamos como parametro en el modelo y que viene desde el controlador
                    }
                )
            }
        })
    }

    ProductoModel.getOne = (id,cb) =>{

        connection
            .findOne( {producto_id : id })
            .exec( (err,docs)=>{
                if(err) throw err
                cb(docs)
            })
    }

    ProductoModel.delete = (id, cb) =>{
        connection.remove({producto_id : id}, (err,docs)=>{
            if(err) throw err
            cb()
        })
    }

    ProductoModel.updateStock = (id) =>{
        console.log(id)
        connection.updateOne({producto_id : id},{$inc: { stock: -1}})
        .exec( (err)=>{
            if(err) throw err
            
        })
    }


    ProductoModel.mostrarPagina = (page,cb) =>{

        let limit = ""
        let previousPage = ""
        let nextPage = ""
        let actualPage = page

        if(page == 1){
            limit = 0
        }else{
            limit = page-1
            previousPage = `http://localhost:3000/producto-listado/pagina=${page-1}`
        }

        connection
            .find().limit(10).skip(limit*10)
            .exec( (err,docs)=>{
                if(err) throw err

                if(docs.length >= 10){
                    nextPage = `http://localhost:3000/producto-listado/pagina=${page+1}`
                }

                cb(docs,nextPage,previousPage,actualPage)
            })
    }


    ProductoModel.buscador = (consulta, cb) =>{

        let resultadosTotales = []
        let consultaParceada = parseInt(consulta)

        connection
            .find({ $text : { $search: consulta, $caseSensitive:false } })
            .exec( (err,docs) =>{
                if(err) throw err
                resultadosTotales = resultadosTotales.concat(docs)

                if(isNaN(consultaParceada)){   // si la consulta del formulario es un string devuelve lo que obtuvo, si no realiza la consulta pero de los campos numericos
                    cb(resultadosTotales)
                }else{
                    connection
                        .find({stock : consultaParceada})  //consulta el campo stock de los documentos
                        .exec( (err,docs) =>{
                            if(err) throw err
                            resultadosTotales = resultadosTotales.concat(docs)
                        
                            connection
                                .find({precio : consultaParceada})  //consulta el campo precio de los documentos
                                .exec( (err,docs) =>{
                                    if(err) throw err
                                    resultadosTotales = resultadosTotales.concat(docs)
                                    cb(resultadosTotales)
                                })
                        
                        })
                }

                
            })
        
    }


    module.exports = ProductoModel