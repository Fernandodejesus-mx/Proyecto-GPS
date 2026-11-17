// HU-39 · Visor del perfil: portada, historias deslizables y vista de lista (archivo de Gloria)
// Se abre desde script.js:  if (tab === "perfil") { abrirVisorPerfil(c); return; }

const estadoPerfil = { carreraId: null, indice: 0, descubiertas: new Set(), volteada: false };
let carreraVisor = null;
let modoVisor = "portada";   // portada | historia | lista | final

function visorEl() { return document.getElementById("visorPerfil"); }

function abrirVisorPerfil(carrera) {
  if (estadoPerfil.carreraId !== carrera.id) {
    estadoPerfil.carreraId = carrera.id; estadoPerfil.indice = 0; estadoPerfil.descubiertas = new Set(); estadoPerfil.volteada = false;
  }
  carreraVisor = carrera;
  document.getElementById("panelDetalle").innerHTML = `<div id="visorPerfil" class="visor"></div>`;
  mostrarPortada();
}

function mostrarPortada() {
  modoVisor = "portada";
  const n = obtenerApartados(carreraVisor.id).length;
  visorEl().innerHTML = `
    <div class="visor-portada">
      <p class="visor-etiqueta">PERFIL DE LA CARRERA</p>
      <h2>${escaparPerfil(carreraVisor.nombre)}</h2>
      <p class="visor-pregunta">¿Cómo será tu carrera?</p>
      <p class="visor-n">${n} apartados por descubrir</p>
      <div class="visor-botones">
        <button id="visorEmpezar" type="button">Empezar</button>
        <button id="visorLista" type="button" class="visor-sec">Ver como lista</button>
      </div>
    </div>`;
  document.getElementById("visorEmpezar").addEventListener("click", () => irAHistoria(0));
  document.getElementById("visorLista").addEventListener("click", () => mostrarLista());
}

// Alternativa accesible: todos los apartados con su texto oficial completo, sin gestos ni animaciones
function mostrarLista() {
  modoVisor = "lista";
  const aps = obtenerApartados(carreraVisor.id);
  visorEl().innerHTML = `
    <div class="visor-lista">
      <p class="visor-etiqueta">PERFIL DE LA CARRERA · LISTA</p>
      <h2>${escaparPerfil(carreraVisor.nombre)}</h2>
      ${aps.map(ap => `
        <section class="visor-item">
          <h3><span aria-hidden="true">${ap.icono}</span> ${escaparPerfil(ap.titular)}</h3>
          <p class="visor-item-nombre">${escaparPerfil(ap.nombre)}</p>
          <div class="carta-texto">${textoApartadoHTML(ap)}</div>
        </section>`).join("")}
      <button id="visorHistorias" type="button" class="visor-sec">Ver como historias</button>
    </div>`;
  document.getElementById("visorHistorias").addEventListener("click", mostrarPortada);
}
function irAHistoria(i) {
  const aps = obtenerApartados(carreraVisor.id);
  i = Math.max(0, Math.min(i, aps.length - 1));
  modoVisor = "historia";
  estadoPerfil.indice = i;
  estadoPerfil.volteada = false;
  const ap = aps[i];
  visorEl().innerHTML = `
    <div class="visor-historia" id="visorHistoria">
      <div class="visor-barras">${aps.map(() => `<span class="visor-barra"></span>`).join("")}</div>
      <div class="visor-top">
        <span class="visor-etq">${escaparPerfil(ap.nombre.toUpperCase())}</span>
        <span class="visor-pos">${i + 1} de ${aps.length}</span>
        <span class="contador-descubiertas" aria-live="polite"></span>
      </div>
      <div class="visor-zona visor-zona-izq" aria-hidden="true"></div>
      <div class="visor-zona visor-zona-der" aria-hidden="true"></div>
      <div class="visor-sitio" id="visorSitio"></div>
      <div class="visor-nav">
        <button id="visorAnt" type="button">‹ Anterior</button>
        <button id="visorSig" type="button">${i === aps.length - 1 ? "Ver mi carta ›" : "Siguiente ›"}</button>
      </div>
    </div>`;
  document.getElementById("visorSitio").appendChild(crearCartaApartado(ap, i + 1, aps.length, estadoPerfil));
  document.querySelectorAll(".visor-barra").forEach((b, k) => { if (k <= i) b.classList.add("vista"); });
  marcarBarras(); actualizarContador(estadoPerfil, aps.length);
  document.querySelector(".visor-zona-izq").addEventListener("click", () => anterior());
  document.querySelector(".visor-zona-der").addEventListener("click", () => siguiente());
  document.getElementById("visorAnt").addEventListener("click", () => anterior());
  document.getElementById("visorSig").addEventListener("click", () => siguiente());
  activarDeslizamiento(document.getElementById("visorHistoria"));
}
// Deslizamiento táctil horizontal: |dx| > 50 px y mayor que |dy|
function activarDeslizamiento(el) {
  let x0 = 0, y0 = 0;
  el.addEventListener("touchstart", e => { x0 = e.changedTouches[0].clientX; y0 = e.changedTouches[0].clientY; }, { passive: true });
  el.addEventListener("touchend", e => {
    const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) { if (dx < 0) siguiente(); else anterior(); }
  }, { passive: true });
}
function siguiente() {
  const n = obtenerApartados(carreraVisor.id).length;
  if (estadoPerfil.indice >= n - 1) mostrarCartaFinal(carreraVisor, estadoPerfil);
  else irAHistoria(estadoPerfil.indice + 1);
}
function anterior() {
  if (estadoPerfil.indice === 0) mostrarPortada();
  else irAHistoria(estadoPerfil.indice - 1);
}
// Teclado: un solo listener para toda la página; solo actúa si el visor está en pantalla
document.addEventListener("keydown", e => {
  if (!visorEl() || modoVisor !== "historia") return;
  if (e.key === "ArrowRight") siguiente();
  else if (e.key === "ArrowLeft") anterior();
  else if (e.key === "Escape") mostrarPortada();
});