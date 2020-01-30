//Define las variables que necesites
const proximos = document.getElementById("proximos");
const pasados = document.getElementById("pasados");

async function cargarDatos(url) {
  const data = await fetch(url);
  const response = await data.json();
  return response;
}

const datosCargados = cargarDatos("../info.json");

const replaceCharacter = string => {
  let palabra = "";
  for (let i = 0; i < string.length; i++) {
    palabra += string[i].trim().replace("-", ",");
  }
  return palabra;
};

let fechasMayores = [];
let fechasMenores = [];

datosCargados.then(data => {
  let fechaActual = data.fechaActual;
  let fechaActualConvertida = replaceCharacter(fechaActual);

  data.eventos.forEach(data => {
    let fechaOriginal = new Date(fechaActualConvertida);
    let fechaCadaEvento = new Date(replaceCharacter(data.fecha));

    if (fechaOriginal > fechaCadaEvento) {
      fechasMenores.push(data);
    } else {
      fechasMayores.push(data);
    }
  });

  for (let i = 0; i < 2; i++) {
    proximos.innerHTML += template(fechasMayores[i]);
    pasados.innerHTML += template(fechasMenores[i]);
  }
});

const proximosTodos = document.getElementById("proximosTodos");
proximosTodos.addEventListener("click", e => {
  e.preventDefault();
  proximos.textContent = "";

  fechasMayores.forEach(elem => {
    proximos.innerHTML += template(elem);
  });
});

const pasadosTodos = document.getElementById("pasadosTodos");
pasadosTodos.addEventListener("click", e => {
  e.preventDefault();
  pasados.textContent = "";

  fechasMenores.forEach(elem => {
    pasados.innerHTML += template(elem);
  });
});

function template({ nombre, fecha, descripcion, lugar, precio, invitados }) {
  return `
  <a class="ancla-pintado" href="detalle.html?nombre=${nombre}&fecha=${fecha}&descripcion=${descripcion}&lugar=${lugar}&precio=${precio}&invitados=${invitados}">
  <article class="pintado">
    <h2 class="pintado__title">${nombre}</h2>
    <small class="pintado__fecha">${fecha}</small>
    <p class="pintado__descripcion">${descripcion}</p>
  </article>`;
}
