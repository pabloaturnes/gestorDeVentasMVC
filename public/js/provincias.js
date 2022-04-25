
document.addEventListener("DOMContentLoaded", ()=>{

    cargarProvincias()


})


async function cargarProvincias(){

    try{

        let $provincias = document.querySelector(".provincia")
        let $template = ""


        let respuesta = await fetch("https://apis.datos.gob.ar/georef/api/provincias")
        let json = await respuesta.json();
        console.log($provincias)

        if(!respuesta.ok) throw {status: respuesta.status, statusText: respuesta.statusText}

        
        
        json.provincias.forEach(provincia => {
            let option = document.createElement("option")
            option.setAttribute("value", provincia.nombre.toUpperCase() ) 
            option.innerHTML = provincia.nombre.toUpperCase()
            $provincias.appendChild(option)
        });




    } catch (error){

        console.log(`Error en la peticion ajax: ${error}`)
    }


}
