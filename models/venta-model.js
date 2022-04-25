const connection = require('./venta-conexion'),
    VentaModel = () =>{

    }


    VentaModel.getAll = (cb) =>{
        connection
        .find()
        .exec( (err,docs) =>{
            if(err) throw err
            cb(docs)
        })
    }


    VentaModel.save = (data,cb) =>{

        connection.create(data, (err)=>{
            if(err) throw err // si hay error lo arroja
            cb() //si no hay error ejecuta la callback
        })
 
    }

    VentaModel.delete = (id,cb) =>{

        connection.remove( {_id : id}, (err, docs)=>{
            if(err) throw err // si hay error lo arroja
            cb() //si no hay error ejecuta la callback
        })
 
    }

    VentaModel.mostrarPagina = (page,cb) =>{

        let limit = ""
        let previousPage = ""
        let nextPage = ""
        let actualPage = page

        if(page == 1){
            limit = 0
        }else{
            limit = page-1
            previousPage = `http://localhost:3000/venta-listado/pagina=${page-1}`
        }

        connection
            .find().limit(10).skip(limit*10)
            .exec( (err,docs)=>{
                if(err) throw err

                if(docs.length >= 10){
                    nextPage = `http://localhost:3000/venta-listado/pagina=${page+1}`
                }

                cb(docs,nextPage,previousPage,actualPage)
            })
    }


    VentaModel.buscador = (consulta, cb) =>{

        let consultaParceada = parseInt(consulta)
        let resultadosTotales = []

        connection
            .find({ $text : { $search: consulta, $caseSensitive:false } })  //busca en el indice creado para todos los campos de tipo string en el documento
            .exec( (err,docs) =>{
                if(err) throw err
                resultadosTotales = resultadosTotales.concat(docs)

                if(isNaN(consultaParceada)){   // si la consulta del formulario es un string devuelve lo que obtuvo, si no realiza la consulta pero de los campos numericos
                    cb(resultadosTotales)
                }else{
                    connection
                        .find({total : consultaParceada})   //busca en el campo total de cada documento
                        .exec( (err,docs)=>{
                            if(err) throw err
                            resultadosTotales = resultadosTotales.concat(docs)

                            connection
                                .find({descuento : consultaParceada}) //busca en el campo descuento de cada documento
                                .exec( (err,docs)=>{
                                    if(err) throw err
                                    resultadosTotales = resultadosTotales.concat(docs)
                                    

                                    if(consulta.length == 24){ //si el string de la busqueda tiene 24 caraceteres (los id de mongo tienen 24), busca por id
                                        connection.find({_id : consulta})
                                        .exec( (err,docs)=>{
                                            if(err) throw err
                                            resultadosTotales = resultadosTotales.concat(docs)
                                            cb(resultadosTotales) // devuelve la callback con todos los resultados
                                            
                                        })
                                    }else{
                                        cb(resultadosTotales) // devuelve la callback con todos los resultados
                                        
                                    }

                                })
                            
                        })
                }
                
            })
    }




module.exports = VentaModel