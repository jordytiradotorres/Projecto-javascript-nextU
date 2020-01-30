const evento = document.getElementById("evento");

let url = location.search;
const param = new URLSearchParams(url);

const nombre = param.get("nombre");
const fecha = param.get("fecha");
const lugar = param.get("lugar");
const descripcion = param.get("descripcion");
const precio = param.get("precio");
const invitados = param.get("invitados");

function template(nombre, fecha, lugar, descripcion, precio, invitados) {
  return `
      <article class="pintado">
        <h2 class="pintado__title">${nombre}</h2>
        <small class="pintado__fecha">${fecha} - ${lugar}</small>
        <p class="pintado__descripcion">${descripcion}</p>
        <p class="pintado__precio">Costo: ${precio}</p>
        <p class="pintado__invitados">Invitados: ${invitados}</p>
      </article>`;
}

evento.innerHTML = template(
  nombre,
  fecha,
  lugar,
  descripcion,
  precio,
  invitados
);
