// ============================================================
// HU-08 · Cuestionario de intereses profesionales
// T-58 · Pantalla de resultados con las áreas profesionales relacionadas
// ============================================================
//
// Qué hace esta pantalla:
//   - Escucha el evento "cuestionario:finalizado" (lo dispara cuestionario.js).
//   - Usa Resultados.procesar() (T-57) para obtener el puntaje por área.
//   - Muestra las 3 áreas con mayor afinidad, con sus carreras relacionadas
//     (cada carrera abre su información en el catálogo).
//   - Muestra el porcentaje de las 7 áreas en barras.
//   - Permite revisar las respuestas, volver a contestar o explorar carreras.
//
// También se puede abrir desde el botón "Ver mis resultados" de la pantalla
// "Cuestionario completado".
// ============================================================

(function () {
  const $ = id => document.getElementById(id);
  const navs = ["navExplorar", "navInicio", "navCuestionario", "navCarrerasRecomendadas"];

  // Mapeo: áreas del cuestionario (7) -> resultados granulares (14)
  const AREA_TO_RESULTADO = {
    "AP-01": 1,  // Tecnología y sistemas -> Desarrollo de software
    "AP-02": 9,  // Gestión y negocios -> Administración y gestión
    "AP-03": 5,  // Industria y procesos -> Optimización de procesos productivos
    "AP-04": 3,  // Electrónica y automatización -> Automatización y control de procesos
    "AP-05": 10, // Ciencias y alimentos -> Análisis químico y control de calidad
    "AP-06": 8,  // Construcción e infraestructura -> Construcción e infraestructura
    "AP-07": 12  // Gastronomía y servicios -> Innovación culinaria y servicios gastronómicos
  };

  function esc(t) {
    return String(t).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  function activarNav(id) {
    navs.forEach(n => $(n).classList.toggle("activo", n === id));
  }

  function chipsCarreras(ids) {
    return ids
      .map(id => carreras.find(c => c.id === id))
      .filter(Boolean)
      .map(c => `<button type="button" class="result-career" data-carrera="${c.id}">${esc(c.nombre)} <span>→</span></button>`)
      .join("");
  }

  function tarjetaDestacada(a, i) {
    return `
      <article class="result-card ${i === 0 ? "top" : ""}">
        <div class="result-card-head">
          <span class="result-rank">${i + 1}</span>
          <div>
            <h3>${esc(a.nombre)}</h3>
            <small>${a.puntos} de ${a.maximo} puntos</small>
          </div>
          <strong class="result-pct">${a.porcentaje}%</strong>
        </div>
        <div class="result-bar"><span style="width:${a.porcentaje}%"></span></div>
        <p>${esc(a.descripcion)}</p>
        <p class="result-label">Carreras relacionadas</p>
        <div class="result-careers">${chipsCarreras(a.carreraIds)}</div>
      </article>`;
  }

  function filaArea(a) {
    return `
      <div class="result-row">
        <span class="result-row-name">${esc(a.nombre)}</span>
        <div class="result-bar"><span style="width:${a.porcentaje}%"></span></div>
        <span class="result-row-pct">${a.porcentaje}%</span>
      </div>`;
  }

  function render(respuestas) {
    const r = Resultados.procesar(respuestas);
    let mensaje = "";

    if (r.sinInteres) {
      mensaje = `<p class="result-note">Tus respuestas muestran poco interés en todas las áreas. Puedes volver a contestar con calma o explorar el catálogo completo de carreras.</p>`;
    } else if (r.hayEmpate) {
      mensaje = `<p class="result-note">Tus dos áreas principales tienen el mismo puntaje, por lo que ambas se relacionan igual con tus intereses.</p>`;
    }

    const destacadas = r.sinInteres
      ? ""
      : `<div class="section-heading"><div><p class="eyebrow">TUS ÁREAS CON MAYOR AFINIDAD</p><h2>Las áreas que más se relacionan contigo</h2></div></div>
         <div class="result-grid">${r.destacadas.map(tarjetaDestacada).join("")}</div>`;

    $("resultadosContenido").innerHTML = `
      ${mensaje}
      ${destacadas}
      <div class="section-heading"><div><p class="eyebrow">DETALLE</p><h2>Resultado por área</h2></div></div>
      <div class="result-table">${r.areas.map(filaArea).join("")}</div>
      <p class="result-disclaimer">Este resultado es una orientación basada en tus intereses; no es un diagnóstico ni una decisión definitiva.</p>
    `;
  }

  function mostrar(respuestas) {
    render(respuestas);
    $("cuestionario").classList.add("hidden");
    $("catalogo").classList.add("hidden");
    $("carrerasRecomendadas").classList.add("hidden");
    $("detalle").classList.add("hidden");
    $("resultados").classList.remove("hidden");
    $("breadcrumb").textContent = "Resultados del cuestionario";
    activarNav("navCuestionario");
    window.scrollTo(0, 0);
  }

  function ocultar() {
    $("resultados").classList.add("hidden");
  }

  // Regresa a la sección del cuestionario (que se había ocultado al mostrar resultados)
  function volverAlCuestionario() {
    ocultar();
    $("cuestionario").classList.remove("hidden");
    $("breadcrumb").textContent = "Cuestionario de intereses";
    activarNav("navCuestionario");
  }

  // ---------- eventos ----------
  document.addEventListener("cuestionario:finalizado", e => mostrar(e.detail.respuestas));

  // Botón "Ver mis resultados" de la pantalla "Cuestionario completado"
  // Redirige a la nueva pantalla Carreras Recomendadas con el resultado mapeado
  $("btnQuizResultados").addEventListener("click", () => {
    const respuestas = Cuestionario.obtenerRespuestas();
    const resultadoId = obtenerResultadoPrincipal(respuestas);
    if (resultadoId) {
      window.location.href = `index.html?resultado=${resultadoId}`;
    } else {
      // Fallback: muestra pantalla de resultados original si no hay mapeo
      mostrar(respuestas);
    }
  });

  // Acciones de la pantalla de resultados
  $("btnResRevisar").addEventListener("click", () => {
    volverAlCuestionario();
    Cuestionario.revisar();
  });
  $("btnResReiniciar").addEventListener("click", () => {
    volverAlCuestionario();
    Cuestionario.reiniciar();
  });
  $("btnResExplorar").addEventListener("click", () => {
    ocultar();
    $("catalogo").classList.remove("hidden");
    $("breadcrumb").textContent = "Explorar carreras";
    activarNav("navExplorar");
    window.scrollTo(0, 0);
  });

  // Clic en una carrera relacionada -> abre su detalle (abrirCarrera está en script.js)
  $("resultadosContenido").addEventListener("click", e => {
    const boton = e.target.closest("[data-carrera]");
    if (!boton) return;
    ocultar();
    activarNav("navExplorar");
    abrirCarrera(Number(boton.dataset.carrera));
  });

  // Al usar el menú lateral o el botón "Volver", se cierra la pantalla de resultados
  ["navExplorar", "navInicio", "navCuestionario", "navCarrerasRecomendadas", "btnVolver"].forEach(id => $(id).addEventListener("click", ocultar));
})();
