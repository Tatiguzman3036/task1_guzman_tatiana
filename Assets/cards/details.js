let contenedorDetails = document.getElementById("contenedorDetails")

let parametros
let capturarId
let buscarId
fetch (`https://mindhub-xj03.onrender.com/api/amazing`)
.then (res => res.json())
.then (data=>{
    let info = data.events
    parametros = new URLSearchParams (location.search)
    capturarId = parametros.get("_id")
    buscarId = info.find(item => item._id == capturarId)
    presentarDetail (buscarId, contenedorDetails)
})
.catch(error => console.log(error))

function presentarDetail(data, contenedor) {
    return contenedor.innerHTML = `<div class="border border-black m-2 w-75 border-3 p-2 rounded" id="imagenDetails" >
    <img  class="h-100 w-100 rounded" src="${data.image}"  alt="Book">
    </div>
    <section class="border border-black border-3 m-2 bg-white rounded">
        <h2 class="text-center">"${data.name}"</h2>
        <h3 class="text-center">"${data.description}"</h3>
        <h5>►Category: "${data.category}"</h5>
        <h5>►Date:"${data.date}"</h5>
        <h5>►Capacity: "${data.capacity}"</h5>
        <h5>► ${data.assistance ? "Assistance" : "Estimate"} : ${data.assistance ? data.assistance : data.estimate}</h5>
        <h5>►Price: "${data.price} USD"</h5>
        <h5>►Place: "${data.place}"</h5>
    </section>`
  }

//infromacion de url se crea con el search 
 //captura el id de cada uno de los eventos
  //buscar id en eventos