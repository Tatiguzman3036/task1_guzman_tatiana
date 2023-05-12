console.log(data);
let contenedorCards = document.getElementById("contenedor_cards")
let checkboxIndex = document.getElementById ("checkboxIndex") //contenedor de checkbox
let navegador = document.getElementById("navegador")
let idCheckbox = document.getElementById("eventosCheckbox")
function presentarCards(events){
    return `<div class="card fondo-cards " style="width: 18rem;">
     <img src="${events.image}" class="card-img-top img-card" alt="">
    <div class="card-body">
        <h5 class="card-title">${events.name} </h5>
        <p class="card-text">${events.description} </p>
        <p class="card-text">${events.category} </p>
    </div>
    <div class="d-flex justify-content-evenly col-12">
        <p>Precio : "${events.price}" USD</p>
        <a href="./Assets/cards/details.html?_id=${events._id} " class="btn btn-primary">See More...</a>
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
crearCard(data.events, contenedorCards)
const checkboxCategory = data.events.map( evento => evento.category) // con map de todos los eventos solo tengo sus categoria (le paso una fn que ejecuta el map una vez por evento)

const checkboxSet = new Set (checkboxCategory) 

let newArrayCategory = Array.from (checkboxSet)

let reduceCheckbox = (acc, category, indice, array) => {
    return acc += `<div>
    <label class="form-check-label" for="${category}">${category}</label>
    <input class="form-check-input" type="checkbox"  value ="${category}" id="${category}">
 </div> `
}

const templateCheckbox = newArrayCategory.reduce(reduceCheckbox, "") //tengo las check en consola aun ya no se repiten
/* console.log(templateCheckbox); */
checkboxIndex.innerHTML = templateCheckbox; //las checkbox estan plasmadas

checkboxIndex.addEventListener(`click`,() => {
    const checkboxChecked = Array.from (document.querySelectorAll (`input[type="checkbox"]:checked`)).map(elemento => elemento.value)
    const checkboxFiltrados = filtrarCheckbox(data.events, checkboxChecked)
    crearCard (checkboxFiltrados, contenedorCards)
   /*  console.log(checkboxFiltrados);  */
})
//tengo que filtrar a eventos: 
function filtrarCheckbox (events, categorias) {
    if (categorias.length == 0) {
        return events
    }
    return events.filter(evento => categorias.includes(evento.category))
}
navegador.addEventListener (`input`,()=> {
    filtroDoble()
})
function filtrarTituloCards(events, buscador) {
    return events.filter(tarjeta => tarjeta.name.toLowerCase().includes(buscador.toLowerCase()))
}
checkboxIndex.addEventListener('change', ()=>{
    filtroDoble()
})
function filtroDoble() {
    const checkboxChecked = Array.from (document.querySelectorAll (`input[type="checkbox"]:checked`)).map(check => check.value)
    let filtroBusqueda = filtrarTituloCards (data.events, navegador.value)
    let checkDoble = filtrarCheckbox (filtroBusqueda, checkboxChecked)
    crearCard (checkDoble, contenedorCards)

}