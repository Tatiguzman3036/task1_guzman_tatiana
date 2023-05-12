console.log(data);
let cards = document.getElementById("cards")
let checkbox = document.getElementById ("checkboxPastEvent")
let navegador = document.getElementById("navegador")

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
function crearCard(array, donde) {
    let template = ""
    if (array.length == 0){
        template = "No hay nada"
    }
    for (let evento of array) {
        template += presentarCards (evento)
    }
    donde.innerHTML = template
}


let filtroCards = data.events.filter (evento => evento.date < data.currentDate ) //funcion flecha que es lo mismo que la funcion de arriba
/* let filtroCards = data.events.filter (function (evento) {
    console.log(evento);
    return evento.date < data.currentDate   
} ) */ // es lo mismo que puse en la funcion flecha realizado de otro modo
crearCard(filtroCards, cards)


const checkboxCategory = data.events.filter(evento => evento.date < data.currentDate)/* .map( evento => evento.category ) */
console.log(checkboxCategory);
function cardPastEvent(array, checkbox) {
    let template = ""
    for (let evento of array) {
        template += presentarCheckbox (evento)
    }
    checkbox.innerHTML = template
}
function presentarCheckbox (eventos) {
    return `<div >
    <label class="form-check-label" for="${eventos.category}">${eventos.category}</label>
    <input class="form-check-input" type="checkbox"  value ="${eventos.category}" id="eventosCheckbox">
 </div> `
}
cardPastEvent ( checkboxCategory, checkbox)

function filtrarCheckbox (events, categorias) {
    if (categorias.length == 0) {
        return events
    }
    return events.filter(evento => categorias.includes(evento.category))
}

navegador.addEventListener (`input`,()=> {
    filtroDoble()
    }
    )
function filtrarTituloCards(events, buscador) {
    return events.filter(tarjeta => tarjeta.name.toLowerCase().includes(buscador.toLowerCase()))
}
checkbox.addEventListener('change', ()=>{
    filtroDoble()
})
function filtrarSeleccionadas(events, valorPorBusqueda) {
    return events.filter(evento =>evento.name.includes(valorPorBusqueda))
}
function filtroDoble() {
    const checkboxChecked = Array.from (document.querySelectorAll (`input[type="checkbox"]:checked`)).map(check => check.value)
    let filtroBusqueda = filtrarTituloCards (data.events, navegador.value)
    let checkDoble = filtrarCheckbox (filtroBusqueda, checkboxChecked)
    crearCard (checkDoble, cards)

}