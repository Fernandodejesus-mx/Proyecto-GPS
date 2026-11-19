// HU-43 · Huellas del ITSX: línea del tiempo de cada carrera (archivo de Fernando)
const MESES_HUELLA = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

function fechaHuella(iso) {
  const [a, m, d] = iso.split("-");
  return Number(d) + " " + MESES_HUELLA[Number(m) - 1] + " " + a;
}

// Dibuja la pestaña Huellas dentro del detalle de la carrera (la llama script.js)
function renderHuellas(carrera) {
  const huellas = obtenerHuellas(carrera.id);
  document.getElementById("panelDetalle").innerHTML = `
    <div class="hl" id="huellas">
      <p class="eyebrow">HUELLAS DEL ITSX</p>
      <h2>Lo que ya ha pasado en ${escHTML(carrera.nombre)}</h2>
      <div id="hlFiltros"></div>
      <div id="hlLinea"></div>
    </div>`;
  pintarLinea(carrera, "");
  document.dispatchEvent(new CustomEvent("huellas-vistas", { detail: { carreraId: carrera.id } }));
}

function pintarLinea(carrera, tipo) {
  const todas = obtenerHuellas(carrera.id);
  const huellas = obtenerHuellas(carrera.id, tipo);
  const linea = document.getElementById("hlLinea");
  if (!todas.length) {
    linea.innerHTML = `<p class="hl-vacio">Todavía no hay huellas de esta carrera. Muy pronto verás aquí los eventos que se han realizado.</p>`;
    return;
  }
  linea.innerHTML = huellas.length ? `<ol class="hl-linea">${huellas.map(h => `
    <li class="hl-item">
      <span class="hl-fecha">${fechaHuella(h.fecha)}</span>
      <div class="hl-carta" role="button" tabindex="0" aria-pressed="false" aria-label="Huella: ${escHTML(h.titulo)}. Toca para voltear">
        <div class="hl-cara hl-frente">
          <span class="hl-tipo">${escHTML(TIPOS_HUELLA[h.tipo] || "Evento")}</span>
          <h3>${escHTML(h.titulo)}</h3>
          <span class="hl-pista">Toca para ver más</span>
        </div>
        <div class="hl-cara hl-reverso">
          <p>${escHTML(h.descripcion)}</p>
          <p class="hl-lugar">📍 Edificio ${escHTML(h.edificio)}${h.ejemplo ? ' · <span class="hl-ejemplo">Ejemplo</span>' : ""}</p>
        </div>
      </div>
    </li>`).join("")}</ol>` : `<p class="hl-vacio">No hay huellas de este tipo.</p>`;
}

// Abre el detalle de una carrera directamente en su pestaña Huellas
function abrirHuellas(carreraId) {
  irACarrera(carreraId);
  irATab("huellas");
}

// ---- Tarjetas que voltean y filtros por tipo
function activarVolteo() {
  const linea = document.getElementById("hlLinea");
  const voltear = carta => {
    const volteada = carta.classList.toggle("volteada");
    carta.setAttribute("aria-pressed", String(volteada));
  };
  linea.addEventListener("click", e => { const c = e.target.closest(".hl-carta"); if (c) voltear(c); });
  linea.addEventListener("keydown", e => {
    const c = e.target.closest(".hl-carta");
    if (c && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); voltear(c); }
  });
}

function pintarFiltros(carrera) {
  const tipos = [...new Set(obtenerHuellas(carrera.id).map(h => h.tipo))];
  const caja = document.getElementById("hlFiltros");
  if (tipos.length < 2) { caja.innerHTML = ""; return; }
  caja.innerHTML = `<div class="hl-filtros" role="group" aria-label="Filtrar por tipo">
    <button type="button" class="hl-chip" data-tipo="" aria-pressed="true">Todas</button>
    ${tipos.map(t => `<button type="button" class="hl-chip" data-tipo="${t}" aria-pressed="false">${escHTML(TIPOS_HUELLA[t])}</button>`).join("")}</div>`;
  caja.addEventListener("click", e => {
    const b = e.target.closest(".hl-chip");
    if (!b) return;
    caja.querySelectorAll(".hl-chip").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
    pintarLinea(carrera, b.dataset.tipo);
  });
}

// Conecta el volteo y los filtros cada vez que se dibuja la pestaña Huellas
document.addEventListener("huellas-vistas", e => {
  if (!document.getElementById("hlFiltros")) return;   // el aviso llegó sin la pestaña abierta
  const carrera = carreras.find(c => c.id === e.detail.carreraId);
  pintarFiltros(carrera);
  activarVolteo();
});