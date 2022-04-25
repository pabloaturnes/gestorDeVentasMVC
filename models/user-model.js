const res = require('express/lib/response')

const connection = require('./user-conexion'),
    UserModel = () =>{

    }

    UserModel.save = (data, cb) =>{

        connection
        .count( {user : data.user}) // la funcion count() de mongoose recibe un criterio de busqueda como parametro. en este caso pregunta si hay un user igual al user del objeto ingresado
        .exec( (err,count) =>{

            if(err) throw err //erroja el error

            if(count == 0){

                connection.create(data , (err)=>{
                    if(err) throw err //si hay error lo arroja
                    cb() //si no hay error ejecuta la callback que viene como parametro desde el controlador
                })
            }else if(count ==  1){ // si count es uno significa que ya hay un user con ese id

                connection.findOneAndUpdate(
                    {user : user},
                    {
                        user : data.user,
                        contrasenia: data.contrasenia,
                        email : data.email,
                        foto : data.foto,
                        preguntaSecreta: data.preguntaSecreta,
                        respuesta : data.respuesta
                    },
                    (err) =>{  //actualiza un registro, la funcion recibe como parametros la condicion (objeto), los datos a actualizar (objeto) y  una callback. (la condicion en este caso es que busque el nombre de usuario)
                        if(err) throw err //si hay error lo arroja
                        cb()    // si no hay erro ejecuta la callback que le pasamos como parametro en el modelo y que viene desde el controlador
                    }
                )
            }
        })
    }

    UserModel.getOne = (user,cb) =>{

        connection
            .findOne({
                user : user.usuario,
                contrasenia : user.contrasenia                 
            })
            .exec( (err,docs) =>{
                if(err) throw err
                cb(docs)
            })
    }

    UserModel.getUser = (user,cb) =>{

        connection
            .findOne({
                user : user.usuario                 
            })
            .exec( (err,docs) =>{
                if(err) throw err
                cb(docs)
            })
    }


    module.exports = UserModel