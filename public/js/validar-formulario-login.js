

let $usuario = document.getElementById("usuario"),
$contrasenia = document.getElementById("contrasenia"),
$inputs = [$usuario,$contrasenia]

document.addEventListener("submit", (event)=>{

    event.preventDefault()

    if( emptyValidation() ) userAndPassword(event)


})



function emptyValidation(){
        
    let inputVacio = false

    $inputs.forEach(input =>{   // validamos que esten vacios o que contengan caracteres

        let $warningLogo = input.nextElementSibling;
        let $warningText= input.nextElementSibling.nextElementSibling;

        $warningLogo.classList.remove("actived")
        $warningText.classList.remove("actived")   

        input.value = input.value.trim();

        if(input.value == ""){
            $warningLogo.classList.add("actived");
            $warningText.classList.add("actived");
            $warningText.innerHTML = `${input.placeholder} no puede estar vacio`;
            inputVacio = true
        }

    })

    if(inputVacio){
        return false
    } else{
        return true
    }

    
}


async function userAndPassword(event){


    try{

        let peticion = {
            usuario : $usuario.value,
            contrasenia : $contrasenia.value
        }
        // peticion ajax
        let options = {

            method : "POST",
            headers : {"Content-type": "application/json; charset=utf-8"},
            body : JSON.stringify(peticion)
        }
        
        let respuesta = await fetch("http://localhost:3000/login-usuario", options)
        let json = await respuesta.json();
        
        
        if(!respuesta.ok) throw {status: respuesta.status, statusText: respuesta.statusText}


        if(json.status){  // si la peticion arroja true entonces coinciden usuario y contraseña y la validacion retorna verdadero

            event.target.submit()

        }else{ //si la peticion arroja negativo entonces NO coinciden usuario y contraseña y manda mensaje de error


            $inputs.forEach(input =>{   // validamos que esten vacios o que contengan caracteres

                let $warningLogo = input.nextElementSibling;
                let $warningText= input.nextElementSibling.nextElementSibling;

                $warningLogo.classList.remove("actived")
                $warningText.classList.remove("actived")   

                input.value = input.value.trim();

                $warningLogo.classList.add("actived");
                $warningText.classList.add("actived");
                $warningText.innerHTML = `Usuario o Contraseña incorrectos`;
                
            })

            return  //return  y bloquea envío de formulario
                    
        }

    }catch(err){

        return  //no encontró el usuario en la bd, es decir que no esta siendo usado

    }


}