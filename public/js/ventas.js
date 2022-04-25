
document.addEventListener("DOMContentLoaded", ()=>{

    // inicializo el carrito de ventas
    let carrito = []    

    // funciones que se ejecutan al cargar el dom
    cargarFecha()
    descuento()
    enviarVenta()
    controlarStockInicial()

 




    // funciones que se ejecutan con acciones
    document.addEventListener("click", (event)=>{

        if(event.target.matches(".agregar-carrito")) agregarAlCarrito(event)
        if(event.target.matches(".quitar-carrito")) quitarDelCarrito(event)

    })




   // definicion de funciones
    function cargarFecha(){

        let inputFecha = document.getElementById("fecha")
        let fecha = Date.now()
        let fechaActual = new Date(fecha)

        let dia = fechaActual.getDate()
        let mes = fechaActual.getMonth() + 1
        let año = fechaActual.getFullYear()

        if(dia <= 9) dia = `0${dia}` 
        if(mes <= 9) mes = `0${mes}` 

        fechaActual = `${año}-${mes}-${dia}`

        inputFecha.value = fechaActual

    }  

    function agregarAlCarrito(event){

        event.preventDefault()
        console.log("se agrego al carrito")

        let item = {
           id : event.target.dataset.id,
           nombre : event.target.dataset.nombre,
           imagen : event.target.dataset.imagen,
           precio : event.target.dataset.precio,
        }

        carrito.push(item)

        let nodo = event.target
        controlarStockEvento(nodo)

        pintarCarrito(carrito)

    }

    function controlarStockEvento (nodo){

        nodo.dataset.stock --
        let $filaDeLaTabla = nodo.parentNode.parentNode
        let $columnaDeStock = $filaDeLaTabla.querySelector(".stock")
        $columnaDeStock.innerHTML = nodo.dataset.stock
        if(nodo.dataset.stock == 0){             //si el stock del nodo llega a 0 se desabilita el enlace y no se puede agregar mas al carrito.
            nodo.style.pointerEvents = 'none' //elimino posibilidad de interactuar con el enlace
            $filaDeLaTabla.classList.remove("poco")
            $filaDeLaTabla.classList.add("agotado")  //agrego clase agotado
        }

        if( nodo.dataset.stock > 0  && nodo.dataset.stock < 11){

            $filaDeLaTabla.classList.add("poco")
        }

    }

    function controlarStockInicial (){

        $nodos = document.querySelectorAll(".agregar-carrito")

        $nodos.forEach(nodo =>{
            
            let $filaDeLaTabla = nodo.parentNode.parentNode
            if(nodo.dataset.stock == 0){             //si el stock del nodo llega a 0 se desabilita el enlace y no se puede agregar mas al carrito.
                nodo.style.pointerEvents = 'none' //elimino posibilidad de interactuar con el enlace
                $filaDeLaTabla.classList.remove("poco")
                $filaDeLaTabla.classList.add("agotado")  //agrego clase agotado
            }
    
            if( nodo.dataset.stock > 0  && nodo.dataset.stock < 11){
                $filaDeLaTabla.classList.add("poco")
            }

        })



    }

    function quitarDelCarrito(event){

        event.preventDefault()
        console.log("se quito del carrito")
        carrito.splice(event.target.dataset.position, 1)
        pintarCarrito(carrito)
        
    }

    function pintarCarrito(carrito){

        let $tablaVenta = document.querySelector(".tabla-ventas table tbody")
        $tablaVenta.innerHTML = ""

        carrito.forEach( (producto, indice) =>{

            let fila = `
                <tr>
                    <td>${producto.id}</td>
                    <td>${producto.nombre}</td>
                    <td>
                        <img class="product-img" src="../uploads/${producto.imagen}" alt="">
                    </td>
                    <td>$${producto.precio}</td>
                    <td class="table-icon-container">
                    <a class="quitar-carrito" href="" data-position="${indice}">
                        <i class="bi bi-dash-circle-fill"></i>
                    </a>
                </td>
                </tr>
            `
            $tablaVenta.innerHTML += fila
        })

        calcularTotal(carrito)
    }


    function calcularTotal(carrito){

        let $descuento = document.getElementById("descuento")
        let descuento = $descuento.value
        let $total = document.querySelector(".venta-container h2")
        let ventaTotal = 0
        
        if(carrito.length != 0){

            carrito.forEach(producto =>{
                ventaTotal += parseInt(producto.precio,10) 
            })
        }

        ventaTotal = ventaTotal - ((ventaTotal* descuento) / 100)

        $total.innerHTML = `Total: $${ventaTotal}`

        return ventaTotal
    }


    function descuento (){

        const $descuento = document.getElementById("descuento")

        $descuento.addEventListener("change", ()=>{ 
            calcularTotal(carrito)
        })
    }


    function enviarVenta(){

        document.addEventListener("submit",(event)=>{

            event.preventDefault()
            const $descuento = document.getElementById("descuento")
            const $vendedor = document.getElementById("vendedor")
            const $cliente = document.getElementById("cliente")
            const $fecha = document.getElementById("fecha")

            let productosVendidos = []
            carrito.forEach(producto =>{
                productosVendidos.push(producto.id)
            })


            let fechaActual = new Date($fecha.value)
            fechaActual.setDate(fechaActual.getDate()+ 1)
            
    

            let fecha = fechaActual
            let venta = {
                fecha : fecha,
                cliente : $cliente.value,
                vendedor : $vendedor.value,
                descuento : $descuento.value,
                total : calcularTotal(carrito),
                idProductosVendidos : productosVendidos
            }
            
            // peticion ajax
            let options = {

                method : "POST",
                headers : {"Content-type": "application/json; charset=utf-8"},
                body : JSON.stringify(venta)
            }
            
            fetch("http://localhost:3000/venta-formulario", options)

            window.location.href = "http://localhost:3000/venta-listado"
            
        })

    }

})


