let cards = document.getElementById("cards")
let checkbox = document.getElementById ("checkboxPastEvent")
let navegador = document.getElementById("navegador")

let infoPastevents
let filtroCards
let newArrayCategory
fetch (`https://mindhub-xj03.onrender.com/api/amazing`)
.then (res => res.json())
.then (data=>{
    infoPastevents = data
    filtroCards = infoPastevents.events.filter (evento => evento.date < infoPastevents.currentDate ) 
    crearCard(filtroCards, cards)
    const checkboxCategory = infoPastevents.events.map( evento => evento.category)
    const checkboxSet = new Set (checkboxCategory) 
    newArrayCategory = Array.from (checkboxSet)
    //pintarCheckbox
    const templateCheckbox = newArrayCategory.reduce(reduceCheckbox, "") 
    checkbox.innerHTML = templateCheckbox
}) 
.catch(error => console.log(error))

//presentar cards
function presentarCards(events){
    return `<div class="card fondo-cards " style="width: 18rem;">
     <img src="${events.image} " class="card-img-top img-card" alt="Festival of the collectivities">
    <div class="card-body">
        <h5 class="card-title">${events.name} </h5>
        <p class="card-text">${events.description} </p>
        <p class="card-text">${events.category} </p>
    </div>
    <div class="d-flex justify-content-evenly col-12">
        <p>Precio : ${events.price} USD</p>
        <a href="../cards/details.html?_id=${events._id} " class="btn btn-primary">See More...</a>
    </div>
</div>`
}
//pintar cards
function crearCard(array, donde) {
    let template = ""
    if (array.length == 0){
        template = "There are no such events"
    }
    for (let evento of array) {
        template += presentarCards (evento)
    }
    donde.innerHTML = template
}

//plasmar checkbox
let reduceCheckbox = (acc, category, indice, array) => {
    return acc += `<div>
    <label class="form-check-label" for="${category}">${category}</label>
    <input class="form-check-input" type="checkbox"  value ="${category}" id="${category}">
 </div> `
}

function filtrarCheckbox (events, categorias) {
    if (categorias.length == 0) {
        return events
    }
    return events.filter(evento => categorias.includes(evento.category))
}

function filtrarSeleccionadas(events, valorPorBusqueda) {
    return events.filter(evento =>evento.name.includes(valorPorBusqueda))
}
function filtrarTituloCards(events, buscador) {
    return events.filter(tarjeta => tarjeta.name.toLowerCase().includes(buscador.toLowerCase()))
}
navegador.addEventListener (`input`,()=> {
    filtroDoble()
    }
    )
checkbox.addEventListener('change', ()=>{
    filtroDoble()
})

function filtroDoble() {
    const checkboxChecked = Array.from (document.querySelectorAll (`input[type="checkbox"]:checked`)).map(check => check.value)
    let filtroBusqueda = filtrarTituloCards (filtroCards, navegador.value)
    let checkDoble = filtrarCheckbox (filtroBusqueda, checkboxChecked)
    crearCard (checkDoble, cards)

}