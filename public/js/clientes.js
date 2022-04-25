
document.addEventListener("DOMContentLoaded", ()=>{

    cargarClientes()


})


async function cargarClientes(){

    try{

        let $clientes = document.getElementById("cliente")
        let $template = ""

        let options = {

            method : "POST",
            headers : {"Content-type": "application/json; charset=utf-8"},
            body : ""
        }

        let respuesta = await fetch("http://localhost:3000/clientes", options)
        let json = await respuesta.json();

        if(!respuesta.ok) throw {status: respuesta.status, statusText: respuesta.statusText}
        
        json.forEach(cliente => {
            let option = document.createElement("option")
            option.setAttribute("value", `${cliente.nombre + "" + cliente.apellido}`) 
            option.innerHTML = cliente.nombre + "" + cliente.apellido
            $clientes.appendChild(option)
        });

    } catch (error){

        console.log(`Error en la peticion ajax: ${error}`)
    }


}
