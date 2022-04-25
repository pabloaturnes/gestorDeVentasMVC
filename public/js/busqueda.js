

document.addEventListener("submit", (event)=>{

    if(event.target.matches(".search")){
        event.preventDefault()

        const $search = document.querySelector(".find-input")

        const $form = document.querySelector(".search")

        console.log($form)

        window.location.href = `${$form.action}${$search.value}`

    }


})


