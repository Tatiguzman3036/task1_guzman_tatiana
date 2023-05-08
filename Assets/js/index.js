console.log(data);
let cards = document.getElementById("cards")
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
        <a href="./Assets/cards/books.html" class="btn btn-primary">See More...</a>
    </div>
</div>`
}
function crearCard(array, donde) {
    let template = ""
    for (let evento of array) {
        template += presentarCards (evento)
    }
    donde.innerHTML = template
}
crearCard(data.events, cards)