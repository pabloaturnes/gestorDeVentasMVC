



let $usuario = document.getElementById("usuario"),
$contrasenia = document.getElementById("contrasenia"),
$contrasenia2 = document.getElementById("contrasenia2"),
$email = document.getElementById("email"),
$email2 = document.getElementById("email2"),
$preguntaSecreta = document.getElementById("pregSecreta"),
$respuesta = document.getElementById("respuesta"),
$foto = document.getElementById("foto")
$inputs = [$usuario,$contrasenia,$contrasenia2,$email,$email2,$preguntaSecreta,$respuesta]

document.addEventListener("submit", (event)=>{

    event.preventDefault()

    let control = true

    if( ! emptyValidation() ) control = false
    if( ! emailValidation() ) control = false
    if( ! emailConicidence() ) control = false
    if( ! passwordValidation() ) control = false
    if( ! passwordConicidence() ) control = false
    


    if(control){// si control es verdadero el formulario se envio correctamente, entonces muestra mensaje y envía el formulario
               
        userExists()
    
    }
    

})

function emptyValidation(){
        
    let inputVacio = false

    $inputs.forEach(input =>{   // validamos que esten vacios o que contengan caracteres

        let $warningLogo = input.nextElementSibling;
        let $warningText= input.nextElementSibling.nextElementSibling;

        $warningLogo.classList.remove("active");  // cada vez que se envia el formulario nuevamente se limpian los iconos y el texto de warning
        $warningText.classList.remove("active");  

        input.value = input.value.trim();

        if(input.value == ""){
            $warningLogo.classList.add("active");
            $warningText.classList.add("active");
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

    
function emailValidation(){

    // valido que lo ingresado tenga formato email
    let $emailInput = document.querySelector("#email");
    let $warningLogo = $emailInput.nextElementSibling;
    let $warningText= $emailInput.nextElementSibling.nextElementSibling;

    let regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;   // regex para un correo electronico
    let spacesRegex = /\s/;          // pregunta si tiene al menos un espacio en blanco 

    if($emailInput.value == ""){
        return false;
    }

    if(!regex.test($emailInput.value)){
        $warningLogo.classList.add("active");
        $warningText.classList.add("active");
        $warningText.innerHTML = "Ingresa un email valido";
        return false; 
    }

    return true

}

    
function passwordValidation(){

    //valido que el pasword ingresado tenga letras de Aa-Zz, al menos un numero, no espacios en blanco y al menos 6 caracteres.
    let $passwordlInput = document.querySelector("#contrasenia");
    let $warningLogo = $passwordlInput.nextElementSibling;
    let $warningText= $passwordlInput.nextElementSibling.nextElementSibling;

    let numberRegex = /[0-9]+/;      //pregunta si tiene al menos un numero
    let spacesRegex = /\s/;          // pregunta si tiene al menos un espacio en blanco
    let letterRegex = /[A-Za-z]+/;   // pregunta si tiene al menos una letra

    if($passwordlInput.value == ""){
        return false;
    }

    if($passwordlInput.value.length < 6){
        $warningLogo.classList.add("active");
        $warningText.classList.add("active");
        $warningText.innerHTML = "contraseña tiene que tener al menos 6 characters";
        return false;
    }

    if(!numberRegex.test($passwordlInput.value)){
        $warningLogo.classList.add("active");
        $warningText.classList.add("active");
        $warningText.innerHTML = "contraseña tiene que tener al menos 1 numero";
        return false;
    }


    if(spacesRegex.test($passwordlInput.value)){ 
        $warningLogo.classList.add("active");
        $warningText.classList.add("active");
        $warningText.innerHTML = "contraseña no puede tener espacios en blanco";
        return false;
    }

    if(!letterRegex.test($passwordlInput.value)){
        $warningLogo.classList.add("active");
        $warningText.classList.add("active");
        $warningText.innerHTML = "contraseña tiene que tener al menos una letra";
        return false;
    }

    return true
}

function passwordConicidence(){

    let $passwordlInput = document.querySelector("#contrasenia");
    let $passwordlInput2 = document.querySelector("#contrasenia2");
    let $warningLogo = $passwordlInput2.nextElementSibling;
    let $warningText= $passwordlInput2.nextElementSibling.nextElementSibling;

    if($passwordlInput.value != $passwordlInput2.value){
        $warningLogo.classList.add("active");
        $warningText.classList.add("active");
        $warningText.innerHTML = "La contraseña no coincide";
        return false
    }

    return true

}

function emailConicidence(){

    let $emailInput = document.querySelector("#email");
    let $emailInput2 = document.querySelector("#email2");
    let $warningLogo = $emailInput2.nextElementSibling;
    let $warningText= $emailInput2.nextElementSibling.nextElementSibling;

    if($emailInput.value != $emailInput2.value){
        $warningLogo.classList.add("active");
        $warningText.classList.add("active");
        $warningText.innerHTML = "El email no coincide";
        return false
    }

    return true

}

async function userExists(){


    try{

        let $userInput = document.querySelector("#usuario")

        let peticion = {
            usuario : $userInput.value
        }
        // peticion ajax
        let options = {

            method : "POST",
            headers : {"Content-type": "application/json; charset=utf-8"},
            body : JSON.stringify(peticion)
        }
        
        let respuesta = await fetch("http://localhost:3000/usuarios", options)
        let json = await respuesta.json();
        

        if(!respuesta.ok) throw {status: respuesta.status, statusText: respuesta.statusText}

        if(json.usuario){
            let $warningLogo = $userInput.nextElementSibling;
            let $warningText= $userInput.nextElementSibling.nextElementSibling;
            $warningLogo.classList.add("active");
            $warningText.classList.add("active");
            $warningText.innerHTML = "Ese usuario no esta disponible";
            return 
        }else{ //se envía el formulario por ajax y se imprime mensajito de ok
            sendUser()
        }
        

    }catch(err){
        console.log(err)
        return //no encontró el usuario en la bd, es decir que no esta siendo usado

    }


}

async function sendUser(){

    const $form = document.getElementById("formularioRegistro"),
        formData = new FormData($form)

    try{

        let options = {
            method : "POST",
            body : formData
        }
        
        let respuesta = await fetch("http://localhost:3000/registrar", options)
        let json = await respuesta.json();

        if(json.status){ //el usuario se ha creado exitosamente y muestro mensajito

            let $submitDiv = document.querySelector(".submit-div")

            let $enlace = document.createElement("a")
            $enlace.innerHTML = "Accede para ingresar"
            $enlace.href = "/login"
    
            let $mensaje = document.createElement("p")
            $mensaje.innerHTML = "¡Felicidades, tu cuenta fue creada exitosamente!"
            $mensaje.classList.add("success-message")
    
            $submitDiv.appendChild($mensaje)
            $submitDiv.appendChild($enlace) 

        } else{ //error al crear el usuario
            console.log("error al crear el usuario")
        }

        if(!respuesta.ok) throw {status: respuesta.status, statusText: respuesta.statusText}


    }catch(err){
        console.log(err)
    }

    return
}





