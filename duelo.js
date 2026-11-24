// HU-46 · Pantalla del Duelo de carreras (archivo de Guillermo)
const dueloEstado = { torneo: null, vista: "" };   // vista: elegir | duelo | final
const sinMovimiento = () => window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Carreras que dejó el cuestionario (vacío si aún no se contesta)
function carrerasDelCuestionario() {
  try { return idsDeResultado(Resultados.procesar(Cuestionario.obtenerRespuestas()), 5); } catch (e) { return []; }
}

function abrirDuelo(ids) {
  mostrarSeccion("duelo", "Duelo de carreras", "navDuelo");
  const lista = (ids && ids.length ? ids : carrerasDelCuestionario()).slice(0, 5);
  if (lista.length === 0) pintarElegir();
  else if (lista.length === 1) pintarGanadora(lista[0]);
  else { dueloEstado.torneo = crearTorneo(lista, Date.now()); pintarDuelo(); }
}

function cartaDueloHTML(carreraId, dimension, lado) {
  const c = carreras.find(x => x.id === carreraId);
  const carta = cartaDeCarrera(carreraId, dimension.id);
  return `<button type="button" class="du-carta carrera-${CARRERA_SLUG[carreraId]}" data-id="${carreraId}" data-lado="${lado}">
    <img src="recursos/${CARRERA_SLUG[carreraId]}/icono.svg" alt="" width="44" height="44">
    <span class="du-nombre">${escHTML(c.nombre)}</span>
    <span class="du-icono" aria-hidden="true">${carta.icono}</span>
    <span class="du-texto">${escHTML(carta.texto)}</span>
  </button>`;
}

function pintarDuelo() {
  dueloEstado.vista = "duelo";
  const t = dueloEstado.torneo;
  const d = siguienteDuelo(t);
  document.getElementById("duelo").innerHTML = `
    <div class="du-hero"><p class="eyebrow">DUELO DE CARRERAS</p><h1>${escHTML(d.dimension.pregunta)}</h1>
      <p class="du-progreso" aria-live="polite">Duelo ${d.numero} de ${d.total}</p>
      <div class="du-barra"><span style="width:${(d.numero - 1) / d.total * 100}%"></span></div></div>
    <div class="du-escenario" id="duEscenario">
      ${cartaDueloHTML(d.izquierda, d.dimension, "izq")}<span class="du-vs" aria-hidden="true">VS</span>${cartaDueloHTML(d.derecha, d.dimension, "der")}
    </div>
    <p class="du-ayuda">Toca una carta, o desliza hacia el lado de la que prefieras. También puedes usar las flechas ← →.</p>`;
  document.getElementById("duEscenario").addEventListener("click", e => {
    const c = e.target.closest(".du-carta");
    if (c) elegirCarta(Number(c.dataset.id));
  });
  activarDeslizamientoDuelo(document.getElementById("duEscenario"), d);
}

function elegirCarta(id) {
  const t = dueloEstado.torneo;
  const d = siguienteDuelo(t);
  if (dueloEstado.vista !== "duelo" || dueloEstado.bloqueado) return;
  dueloEstado.bloqueado = true;
  document.querySelectorAll(".du-carta").forEach(c => c.classList.add(Number(c.dataset.id) === id ? "gana" : "pierde"));
  setTimeout(() => {
    dueloEstado.bloqueado = false;
    votar(t, id);
    const fin = ganadoraFinal(t);
    if (fin) pintarGanadora(fin); else pintarDuelo();
  }, sinMovimiento() ? 0 : 500);
}

// Deslizar hacia la izquierda elige la carta de la izquierda; hacia la derecha, la de la derecha
function activarDeslizamientoDuelo(el, d) {
  let x0 = 0, y0 = 0;
  el.addEventListener("touchstart", e => { x0 = e.changedTouches[0].clientX; y0 = e.changedTouches[0].clientY; }, { passive: true });
  el.addEventListener("touchend", e => {
    const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) elegirCarta(dx < 0 ? d.izquierda : d.derecha);
  }, { passive: true });
}

document.addEventListener("keydown", e => {
  if (dueloEstado.vista !== "duelo" || document.getElementById("duelo").classList.contains("hidden")) return;
  const d = dueloEstado.torneo && siguienteDuelo(dueloEstado.torneo);
  if (!d) return;
  if (e.key === "ArrowLeft") elegirCarta(d.izquierda);
  else if (e.key === "ArrowRight") elegirCarta(d.derecha);
});

// ---- Revelado de la carrera ganadora
function pintarGanadora(carreraId) {
  dueloEstado.vista = "final";
  const c = carreras.find(x => x.id === carreraId);
  document.getElementById("duelo").innerHTML = `
    <div class="du-final carrera-${CARRERA_SLUG[carreraId]}">
      <p class="du-suspenso">Tu carrera es…</p>
      <div class="du-reveal">
        <img src="recursos/${CARRERA_SLUG[carreraId]}/icono.svg" alt="" width="72" height="72">
        <h2>${escHTML(c.nombre)}</h2>
        <p>${escHTML(c.resumen)}</p>
        <ul class="du-datos">${DIMENSIONES.map(d => { const x = cartaDeCarrera(carreraId, d.id); return `<li><span aria-hidden="true">${x.icono}</span> <b>${escHTML(d.pregunta)}</b><br>${escHTML(x.texto)}</li>`; }).join("")}</ul>
        <div class="du-acciones">
          <button type="button" id="duPerfil">Ver el perfil de esta carrera</button>
          <button type="button" id="duCarta" class="du-sec">Descargar mi carta</button>
          <button type="button" id="duOtra" class="du-sec">Volver a competir</button>
        </div>
      </div>
    </div>`;
  document.getElementById("duPerfil").addEventListener("click", () => { irACarrera(carreraId); irATab("perfil"); });
  document.getElementById("duCarta").addEventListener("click", () => descargarCartaEgresado(c));
  document.getElementById("duOtra").addEventListener("click", () => pintarElegir());
  document.dispatchEvent(new CustomEvent("carrera-elegida", { detail: { carreraId } }));
}

// Si no hay resultado del cuestionario, la persona elige de 2 a 5 carreras
function pintarElegir() {
  dueloEstado.vista = "elegir";
  document.getElementById("duelo").innerHTML = `
    <div class="du-hero"><p class="eyebrow">DUELO DE CARRERAS</p><h1>Elige las carreras que quieres comparar</h1>
      <p class="lead">Escoge de 2 a 5. Si contestas el cuestionario, aquí aparecerán automáticamente las que mejor se relacionan contigo.</p></div>
    <form id="duForm" class="du-elegir"><div class="du-lista">${carreras.map(c => `<label class="du-opcion"><input type="checkbox" value="${c.id}"> <span>${escHTML(c.nombre)}</span></label>`).join("")}</div>
      <p id="duAviso" class="du-aviso" role="status">Elige al menos 2 carreras.</p>
      <button type="submit" id="duEmpezar" disabled>Empezar el duelo</button></form>`;
  const form = document.getElementById("duForm");
  const marcadas = () => [...form.querySelectorAll("input:checked")].map(i => Number(i.value));
  form.addEventListener("change", () => {
    const n = marcadas().length;
    form.querySelectorAll("input:not(:checked)").forEach(i => { i.disabled = n >= 5; });
    document.getElementById("duEmpezar").disabled = n < 2;
    document.getElementById("duAviso").textContent = n < 2 ? "Elige al menos 2 carreras." : n >= 5 ? "Llegaste al máximo de 5 carreras." : n + " carreras elegidas.";
  });
  form.addEventListener("submit", e => { e.preventDefault(); abrirDuelo(marcadas()); });
}