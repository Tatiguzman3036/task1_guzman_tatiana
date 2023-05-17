let primerTabla = document.getElementById("primerTabla");
let segundaTabla = document.getElementById("segundaTabla");
let tercerTabla = document.getElementById("tercerTabla");
let info;
let info2;
let eventosPasados;
let capacidadEventos;
let categorias;
let eventosFuturos;
let categoriasFuturo;
let categoriasPasado;

fetch(`https://mindhub-xj03.onrender.com/api/amazing`)
  .then((res) => res.json())
  .then((data) => {
    info = data;
    info2 = [...info.events];
    /* console.log(info2); */

    eventosFuturos = info2.filter((evento) => evento.date > info.currentDate);
    eventosPasados = info2.filter((evento) => evento.date < info.currentDate);
    /* console.log(eventosPasados);
    console.log(eventosFuturos); */
    pintarPrimerTabla(eventosPasados, primerTabla);

    //EVENTOS FUTUROS:
    categoriasFuturo = eventosFuturos.map((evento) => evento.category);
    /*    console.log(categoriasFuturo); */
    const categoriaFuturoSet = new Set(categoriasFuturo);
    let newArrayCategoryFuturo = Array.from(categoriaFuturoSet);
    /* console.log(newArrayCategoryFuturo); */ //CATEGORIA NO SE REPITE EN PRIMER FILA :
    const templateFuturo = newArrayCategoryFuturo.reduce(pintarSegundaTabla,  "");
    segundaTabla.innerHTML = templateFuturo;
    //EVENTOS PASADOS :
    categoriasPasado = eventosPasados.map((evento) => evento.category);
    /* console.log(categoriasPasado); */
    const categoriaPasadoSet = new Set(categoriasPasado);
    let newArrayCategoryPasado = Array.from(categoriaPasadoSet);
    /* console.log(newArrayCategoryPasado); */
    const templatePasado = newArrayCategoryPasado.reduce(pintarTercerTabla, "");
    tercerTabla.innerHTML = templatePasado;
  })
  .catch((error) => console.log(error));
/////// PRIMER TABLA/////
function eventoMayorGente() {
  const array = eventosPasados.slice();
  //porcentaje:
  let porcentaje = (evento) => (evento.assistance / evento.capacity) * 100;
  //sort:ordena las filas por los valores que le de: creciente
  array.sort((itemA, itemB) => {
    return porcentaje(itemB) - porcentaje(itemA);
  });
  return `${array[0].name} : ${porcentaje(array[0]).toFixed(1)}%`;
}

function eventoMenosGente() {
  let array = eventosPasados.slice();
  //porcentaje:
  let porcentaje = (evento) => (evento.assistance / evento.capacity) * 100;

  //sort:ordena las filas por los valores que le de: decreciente
  array.sort((itemA, itemB) => {
    return porcentaje(itemA) - porcentaje(itemB);
  });
  return `${array[0].name} : ${porcentaje(array[0]).toFixed(2)}%`;
}

function eventoConMasCapacidad() {
  let array = info2.slice();
  /* console.log(array); */
  array.sort((itemA, itemB) => {
    return itemB.capacity - itemA.capacity;
  });

  return `${array[0].name} : ${array[0].capacity} `;
}

function pintarPrimerTabla(data, donde) {
  let masGente = eventoMayorGente(data);
  let menosGente = eventoMenosGente(data);
  let eventoMayorCapacidad = eventoConMasCapacidad();
  donde.innerHTML += `<tr>
                            <td>${masGente}</td>
                            <td>${menosGente}</td>
                            <td>${eventoMayorCapacidad}</td>
                        </tr> `;
}
//////// SEGUNDA TABLA ////////////

function pintarSegundaTabla(acc, category) {
  let categoriaFuturo = {};
  eventosFuturos.forEach((evento) => {
    let nombreCategoria = evento.category;
    if (!categoriaFuturo[nombreCategoria]) {
      categoriaFuturo[nombreCategoria] = {eventos : []};
    }
    categoriaFuturo[nombreCategoria].eventos.push(evento);
  });
 /*  console.log(categoriaFuturo); */
 
 // Calcular el producto del precio y el estimado por categoría
  for (let categoria in categoriaFuturo) {
    let totalCategoria = 0;
    categoriaFuturo[categoria].eventos.forEach((evento) => {
      let estimado = evento.estimate;
      let precio = evento.price;
      let producto = estimado * precio;
      totalCategoria += producto;
    });
    categoriaFuturo[categoria].estadistica = {
      category: categoria,
      revenius: totalCategoria,
      
    };
    /* console.log(categoriaFuturo[categoria]); */
  }
  for (let categoria in categoriaFuturo) {
    let porcentajeTotal = 0;
      categoriaFuturo[categoria].eventos.forEach((evento) => {
        let estimadoTotal = evento.estimate;
        let capacidadTotal = evento.capacity;
        let porcentajeEstimadoAsistencia = ((estimadoTotal / capacidadTotal ) * 100 ) / categoriaFuturo[categoria].eventos.length 
        porcentajeTotal += porcentajeEstimadoAsistencia
      });
      categoriaFuturo[categoria].porcentaje = {
        category: categoria,
        ultimo: porcentajeTotal,
      }
    }
  return (acc += `<tr>
                            <td>${category}</td>
                            <td> $${categoriaFuturo[category].estadistica.revenius.toLocaleString()} </td>
                            <td>${categoriaFuturo[category].porcentaje.ultimo.toFixed(2)}%</td>
                        </tr> `);
}

function pintarTercerTabla(acc, category) {
    let categoriaPasado = {};
    eventosPasados.forEach((evento) => {
      let nombreCategoria = evento.category;
      if (!categoriaPasado[nombreCategoria]) {
        categoriaPasado[nombreCategoria] = {eventos : []};
      }
      categoriaPasado[nombreCategoria].eventos.push(evento);
    });
    /* console.log(categoriaPasado); */
    for (let categoria in categoriaPasado) {
    let totalCategoria = 0;
      categoriaPasado[categoria].eventos.forEach((evento) => {
      let asistencia = evento.assistance;
      let precio = evento.price;
      let producto = asistencia * precio;
      totalCategoria += producto;
    });
    categoriaPasado[categoria].estadistica = {
      category: categoria,
      revenius: totalCategoria,
      
    };
    /* console.log(categoriaPasado[categoria]); */
  }
  for (let categoria in categoriaPasado) {
    let porcentajeTotal = 0;
      categoriaPasado[categoria].eventos.forEach((evento) => {
        let asistenciaTotal = evento.assistance;
        let capacidadTotal = evento.capacity;
        let porcentajeAsistencia = ((asistenciaTotal / capacidadTotal ) * 100 ) / categoriaPasado[categoria].eventos.length 
        porcentajeTotal += porcentajeAsistencia
      });
      categoriaPasado[categoria].porcentaje = {
        category: categoria,
        ultimo: porcentajeTotal,
      }
    }
  return (acc +=        `<tr>
                            <td>${category}</td>
                            <td>$${categoriaPasado[category].estadistica.revenius.toLocaleString()} </td>
                            <td>${categoriaPasado[category].porcentaje.ultimo.toFixed(2)}%</td>
                        </tr> `);
}
