



document.addEventListener("DOMContentLoaded", ()=>{


document.addEventListener("click", (event)=>{

    if(event.target.matches(".collapse")){

        event.target.classList.toggle("active")
        let $collapse = document.querySelector(event.target.dataset.target) 
        $collapse.classList.toggle("collapsed")

        let $arrowIcon = event.target.querySelector("div").querySelector(".arrow")
        $arrowIcon.classList.toggle("icon-active")
    }

    if(event.target.matches(".hamburguer-button-container")){

        let $sidebar = document.querySelector("aside")
        $sidebar.classList.toggle("menu-active")

        event.target.classList.toggle("active")
        console.log(event.target)
    }

})






})