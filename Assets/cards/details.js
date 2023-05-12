let contenedorDetails = document.getElementById("contenedorDetails")
let info = data.events

let parametros = new URLSearchParams (location.search)//infromacion de url se crea con el search 
let capturarId = parametros.get("_id")//captura el id de cada uno de los eventos
let buscarId = info.find(item => item._id == capturarId) //buscar id en eventos
contenedorDetails.innerHTML = `<div class="border border-black m-2 w-75 border-3 p-2 rounded" id="imagenDetails" >
                                    <img  class="h-100 w-100 rounded" src="${buscarId.image}"  alt="Book">
                                </div>
                                <section class="border border-black border-3 m-2 bg-white rounded">
                                    <h2 class="text-center">"${buscarId.name}"</h2>
                                    <h3 class="text-center">"${buscarId.description}"</h3>
                                    <p>_Category: "${buscarId.category}"</p>
                                    <p>_Date:"${buscarId.date}"</p>
                                    <p>_Capacity: "${buscarId.capacity}"</p>
                                    <p>_Price: "${buscarId.price}"</p>
                                    <p>_Place: "${buscarId.place}"</p>
                                </section>`
