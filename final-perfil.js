// HU-41 · Carta final del egresado (archivo de Fernando)
function mostrarCartaFinal(carrera, estado) {
  modoVisor = "final";
  const aps = obtenerApartados(carrera.id);
  const faltan = aps.filter(a => !estado.descubiertas.has(a.id));
  visorEl().innerHTML = `
    <div class="final-carta" role="region" aria-label="Carta del egresado">
      <p class="final-etiqueta">CARTA DEL EGRESADO</p>
      <h2>${escaparPerfil(carrera.nombre)}</h2>
      <ul class="final-lista">
        ${aps.map(a => `<li class="${estado.descubiertas.has(a.id) ? "final-si" : "final-no"}"><span aria-hidden="true">${a.icono}</span> ${escaparPerfil(a.titular)}</li>`).join("")}
      </ul>
      ${faltan.length ? `<p class="final-faltan">Te ${faltan.length === 1 ? "falta 1 apartado" : "faltan " + faltan.length + " apartados"} por descubrir.</p>
        <button id="finalPendiente" type="button" class="final-btn">Ir a la primera pendiente</button>` : ""}
      <div class="final-acciones">
        <button id="finalActividades" type="button" class="final-btn">Conocer las actividades de esta carrera</button>
        <button id="finalRepasar" type="button" class="final-btn final-sec">Volver a verlo</button>
        <button id="finalDescargar" type="button" class="final-btn final-sec">Descargar mi carta (PNG)</button>
      </div>
    </div>`;
  document.getElementById("finalActividades").addEventListener("click", () => irATab("actividades"));
  document.getElementById("finalRepasar").addEventListener("click", () => { estadoPerfil.indice = 0; abrirVisorPerfil(carrera); });
  const pend = document.getElementById("finalPendiente");
  if (pend) pend.addEventListener("click", () => irAHistoria(aps.findIndex(a => !estado.descubiertas.has(a.id))));
  const d = document.getElementById("finalDescargar");
  if (typeof descargarCartaEgresado === "function") d.addEventListener("click", () => descargarCartaEgresado(carrera));
  else d.hidden = true;
}