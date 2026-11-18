// Navegación común del Sprint Final (archivo de Gloria; el resto del equipo solo lo usa)
const SECCIONES_FINAL = ["catalogo", "detalle", "cuestionario", "resultados", "carrerasRecomendadas", "faq", "mapaCampus", "calendario", "pasaporte", "duelo", "interes"];

// Muestra solo una sección, cambia el título de la barra superior y marca el botón del menú
function mostrarSeccion(id, titulo, navId) {
  SECCIONES_FINAL.forEach(s => { const e = document.getElementById(s); if (e) e.classList.add("hidden"); });
  document.getElementById(id).classList.remove("hidden");
  document.getElementById("breadcrumb").textContent = titulo;
  document.querySelectorAll(".nav-item").forEach(b => b.classList.toggle("activo", b.id === navId));
  window.scrollTo(0, 0);
}

// Abre el detalle de una carrera desde cualquier pantalla
function irACarrera(id) {
  mostrarSeccion("detalle", "Explorar carreras", "navExplorar");
  abrirCarrera(id);
}

// Escapa texto antes de ponerlo en el HTML
function escHTML(t) {
  return String(t).replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
}

function enConstruccion(titulo) {
  return `<div class="en-construccion"><h2>${escHTML(titulo)}</h2><p>En construcción.</p></div>`;
}

// Botones nuevos del menú lateral
const ENTRADAS_FINAL = { navMapa: () => abrirMapa(), navCalendario: () => abrirCalendario(), navPasaporte: () => abrirPasaporte(), navDuelo: () => abrirDuelo(), navInteres: () => abrirInteres() };
Object.keys(ENTRADAS_FINAL).forEach(id => document.getElementById(id).addEventListener("click", () => ENTRADAS_FINAL[id]()));

// Al usar el menú anterior, las secciones nuevas se esconden
["navExplorar", "navInicio", "navCuestionario", "navCarrerasRecomendadas", "navFaq", "btnVolver"].forEach(id => {
  document.getElementById(id).addEventListener("click", () => {
    ["mapaCampus", "calendario", "pasaporte", "duelo", "interes"].forEach(s => document.getElementById(s).classList.add("hidden"));
  });
});