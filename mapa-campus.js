// HU-47 · Mapa interactivo del campus (archivo de Fernando)
const mapaEstado = { sel: null, poi: false };   // sel = { tipo: "edificio" | "poi", id }
const seccionesPanel = [];      // cada tarea agrega una función (sel) => HTML para el panel
const accionesPanel = {};       // acciones de los botones del panel: nombre => función(valor)

// Un botón transparente sobre el edificio; su posición va en porcentaje para que se adapte a cualquier pantalla
function zonaHTML(rect, atributos, etiqueta, clase) {
  const [x, y, w, h] = rect;
  const p = (v, total) => (v / total * 100).toFixed(3) + "%";
  return `<button type="button" class="mp-zona ${clase}" ${atributos} aria-label="${escHTML(etiqueta)}" style="left:${p(x, MAPA_ANCHO)};top:${p(y, MAPA_ALTO)};width:${p(w, MAPA_ANCHO)};height:${p(h, MAPA_ALTO)}"></button>`;
}

function abrirMapa() {
  mapaEstado.sel = null;
  mostrarSeccion("mapaCampus", "Mapa del campus", "navMapa");
  const edificios = Object.keys(EDIFICIOS).map(l => EDIFICIOS[l].zonas.map(z => zonaHTML(z, `data-tipo="edificio" data-id="${l}"`, EDIFICIOS[l].nombre, "mp-edificio")).join("")).join("");
  const puntos = PUNTOS_INTERES.map(p => p.zonas.map(z => zonaHTML(z, `data-tipo="poi" data-id="${p.id}"`, p.nombre, "mp-poi")).join("")).join("");
  document.getElementById("mapaCampus").innerHTML = `
    <div class="mp-hero"><p class="eyebrow">CONOCE EL CAMPUS</p><h1>Mapa del campus ITSX</h1>
      <p class="lead">Toca un edificio para ver qué carreras están ahí y lo que ha pasado en ellas.</p></div>
    <div class="mp-barra" id="mpBarra"></div>
    <div class="mp-layout">
      <div class="mp-scroll"><div class="mp-lienzo" id="mpLienzo" style="aspect-ratio:${MAPA_ANCHO} / ${MAPA_ALTO}">
        <img src="${MAPA_IMAGEN}" alt="Mapa del campus del Instituto Tecnológico Superior de Xalapa" draggable="false">${edificios}${puntos}</div></div>
      <aside class="mp-panel" id="mpPanel" aria-live="polite"></aside>
    </div>`;
  document.getElementById("mpLienzo").addEventListener("click", e => {
    const z = e.target.closest(".mp-zona");
    if (z) seleccionarMapa({ tipo: z.dataset.tipo, id: z.dataset.id });
  });
  document.getElementById("mpPanel").addEventListener("click", e => {
    const b = e.target.closest("[data-panel-accion]");
    if (b && accionesPanel[b.dataset.panelAccion]) accionesPanel[b.dataset.panelAccion](b.dataset.valor);
  });
  pintarPanelMapa();
  document.dispatchEvent(new CustomEvent("mapa:render"));
}

function seleccionarMapa(sel) {
  mapaEstado.sel = sel;
  document.querySelectorAll(".mp-zona").forEach(z => z.classList.toggle("sel", z.dataset.tipo === sel.tipo && z.dataset.id === sel.id));
  pintarPanelMapa();
  if (sel.tipo === "edificio") document.dispatchEvent(new CustomEvent("edificio-visitado", { detail: { edificio: sel.id } }));
}

function pintarPanelMapa() {
  const sel = mapaEstado.sel;
  document.getElementById("mpPanel").innerHTML = sel
    ? seccionesPanel.map(f => f(sel)).join("")
    : `<p class="mp-vacio">Toca un edificio del mapa para ver su información.</p>`;
}

// Parte 1 del panel: nombre y lo que hay en el edificio
seccionesPanel.push(sel => {
  if (sel.tipo !== "edificio") return "";
  const e = EDIFICIOS[sel.id];
  return `<h3>${escHTML(e.nombre)}</h3><p class="mp-sub">Aquí encuentras</p><ul class="mp-puntos">${e.puntos.map(p => `<li>${escHTML(p)}</li>`).join("")}</ul>`;
});