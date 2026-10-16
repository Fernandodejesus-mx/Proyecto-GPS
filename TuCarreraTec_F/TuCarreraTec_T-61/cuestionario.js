// ============================================================
// HU-08 · Cuestionario de intereses profesionales
// T-55 · Pantalla del cuestionario
// ============================================================
//
// Qué hace esta pantalla:
//   - Muestra las preguntas de UNA área profesional por página (7 páginas).
//   - Cada pregunta tiene las 5 opciones de la escala (T-51) y solo se
//     puede elegir una.
//   - Muestra el progreso (área actual, preguntas respondidas).
//   - Botones Anterior / Continuar / Finalizar.
//   - Valida que el área esté completa para avanzar y que todo el
//     cuestionario esté completo para finalizar.
//
// Integración con las siguientes tareas (T-57, T-58 y T-59):
//   - Al finalizar se dispara el evento "cuestionario:finalizado" en
//     document, con detail.respuestas = { "AP-01-P01": 3, ... }
//     (id de pregunta -> valor de la opción elegida, de 0 a 4).
//   - También quedan disponibles window.Cuestionario.obtenerRespuestas()
//     y window.Cuestionario.estaCompleto().
//
// Datos: preguntas.js (areasCuestionario, preguntasCuestionario,
// escalaCuestionario).
// ============================================================

(function () {
  const $ = id => document.getElementById(id);
  const CLAVE = "tct_cuestionario_hu08";

  // Áreas con sus preguntas agrupadas
  const grupos = areasCuestionario.map(a => ({
    ...a,
    preguntas: preguntasCuestionario.filter(p => p.idArea === a.id)
  }));
  const TOTAL = preguntasCuestionario.length;
  const valoresValidos = escalaCuestionario.map(o => o.valor);
  const idsValidos = new Set(preguntasCuestionario.map(p => p.id));

  let respuestas = {};   // { idPregunta: valor }
  let areaActual = 0;

  // ---------- utilidades ----------
  function esc(t) {
    return String(t).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  const contestadas = () => Object.keys(respuestas).length;
  const respondida = p => respuestas[p.id] !== undefined;
  const faltantesDe = grupo => grupo.preguntas.filter(p => !respondida(p));
  const faltantesTotal = () => preguntasCuestionario.filter(p => !respondida(p));
  const plural = (n, uno, varios) => `${n} ${n === 1 ? uno : varios}`;

  // ---------- almacenamiento (se conserva al recargar la página) ----------
  function guardar() {
    try {
      sessionStorage.setItem(CLAVE, JSON.stringify({ respuestas, areaActual }));
    } catch (e) { /* sin almacenamiento: el cuestionario funciona igual */ }
  }

  function cargar() {
    try {
      const data = JSON.parse(sessionStorage.getItem(CLAVE) || "null");
      if (!data) return;
      Object.entries(data.respuestas || {}).forEach(([id, v]) => {
        if (idsValidos.has(id) && valoresValidos.includes(v)) respuestas[id] = v;
      });
      if (Number.isInteger(data.areaActual) && data.areaActual >= 0 && data.areaActual < grupos.length) {
        areaActual = data.areaActual;
      }
    } catch (e) { /* datos dañados: se empieza de cero */ }
  }

  // ---------- progreso ----------
  function actualizarProgreso() {
    const g = grupos[areaActual];
    $("quizAreaTitulo").textContent = `Área ${areaActual + 1} de ${grupos.length}`;
    $("quizAreaNombre").textContent = g.nombre;

    $("quizPasos").innerHTML = grupos.map((x, i) => {
      const completa = faltantesDe(x).length === 0;
      const clase = i === areaActual ? "current" : (completa ? "done" : "");
      return `<span class="quiz-step ${clase}"></span>`;
    }).join("");

    const n = contestadas();
    $("quizContador").textContent = `${n} de ${TOTAL} respondidas · ${Math.round(n / TOTAL * 100)}%`;

    const faltan = faltantesDe(g).length;
    const ultima = areaActual === grupos.length - 1;
    $("quizHint").textContent = faltan === 0
      ? (ultima ? "Todo listo. Puedes finalizar el cuestionario." : "Área completa. Puedes continuar.")
      : `Faltan ${plural(faltan, "pregunta", "preguntas")} en esta área.`;
  }

  // ---------- pantalla de una área ----------
  function renderArea() {
    const g = grupos[areaActual];
    const ultima = areaActual === grupos.length - 1;

    $("quizAreaPill").textContent = `${g.id} · ${g.nombre}`;
    $("quizRango").textContent = `${g.preguntas.length} preguntas en esta área`;

    $("quizPreguntas").innerHTML = g.preguntas.map((p, i) => `
      <article class="quiz-card" id="card-${p.id}" data-pregunta="${p.id}">
        <div class="quiz-q">
          <span class="quiz-num">${i + 1}</span>
          <h3 id="enunciado-${p.id}">${esc(p.texto)}</h3>
          <span class="quiz-id">${p.id}</span>
        </div>
        <fieldset class="quiz-options" aria-labelledby="enunciado-${p.id}">
          ${escalaCuestionario.map(o => `
            <label class="quiz-option">
              <input type="radio" name="q-${p.id}" value="${o.valor}" data-pregunta="${p.id}"
                ${respuestas[p.id] === o.valor ? "checked" : ""}>
              <span>${esc(o.texto)}</span>
            </label>
          `).join("")}
        </fieldset>
      </article>
    `).join("");

    $("btnQuizAnterior").disabled = areaActual === 0;
    $("btnQuizSiguiente").textContent = ultima ? "Finalizar ✓" : "Continuar →";
    ocultarAviso();
    actualizarProgreso();
  }

  // ---------- avisos y validación ----------
  function mostrarAviso(texto) {
    const a = $("quizAviso");
    a.textContent = texto;
    a.classList.remove("hidden");
  }

  function ocultarAviso() { $("quizAviso").classList.add("hidden"); }

  function marcarPendientes() {
    const pendientes = faltantesDe(grupos[areaActual]);
    pendientes.forEach(p => $(`card-${p.id}`).classList.add("pendiente"));
    if (pendientes.length) {
      $(`card-${pendientes[0].id}`).scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  function irAArea(indice) {
    areaActual = indice;
    guardar();
    renderArea();
    window.scrollTo(0, 0);
  }

  // ---------- botones ----------
  function anterior() {
    if (areaActual > 0) irAArea(areaActual - 1);
  }

  function siguiente() {
    const g = grupos[areaActual];
    const faltanAqui = faltantesDe(g).length;

    if (areaActual < grupos.length - 1) {
      if (faltanAqui > 0) {
        mostrarAviso(`Responde ${plural(faltanAqui, "pregunta pendiente", "preguntas pendientes")} de esta área para continuar.`);
        marcarPendientes();
        return;
      }
      irAArea(areaActual + 1);
      return;
    }

    // Última área: se valida todo el cuestionario antes de finalizar
    const faltan = faltantesTotal();
    if (faltan.length === 0) {
      finalizar();
      return;
    }

    const primeraIncompleta = grupos.findIndex(x => faltantesDe(x).length > 0);
    if (primeraIncompleta !== areaActual) {
      irAArea(primeraIncompleta);
      mostrarAviso(`Aún faltan ${plural(faltan.length, "pregunta", "preguntas")} por responder. Te llevamos al área "${grupos[primeraIncompleta].nombre}" para completarla.`);
    } else {
      mostrarAviso(`Aún faltan ${plural(faltan.length, "pregunta", "preguntas")} por responder para finalizar.`);
    }
    marcarPendientes();
  }

  function finalizar() {
    $("quizFormulario").classList.add("hidden");
    $("quizFinal").classList.remove("hidden");
    $("quizFinalTexto").textContent =
      `Respondiste las ${TOTAL} preguntas. Tus respuestas quedaron registradas; consulta tus resultados para ver las áreas profesionales relacionadas.`;
    window.scrollTo(0, 0);
    document.dispatchEvent(new CustomEvent("cuestionario:finalizado", { detail: { respuestas: { ...respuestas } } }));
  }

  function revisar() {
    $("quizFinal").classList.add("hidden");
    $("quizFormulario").classList.remove("hidden");
    irAArea(0);
  }

  function reiniciar() {
    respuestas = {};
    $("quizFinal").classList.add("hidden");
    $("quizFormulario").classList.remove("hidden");
    irAArea(0);
  }

  // ---------- navegación del sitio ----------
  const navs = ["navExplorar", "navInicio", "navCuestionario"];
  function activarNav(id) {
    navs.forEach(n => $(n).classList.toggle("activo", n === id));
  }

  function abrir() {
    $("catalogo").classList.add("hidden");
    $("detalle").classList.add("hidden");
    $("cuestionario").classList.remove("hidden");
    $("breadcrumb").textContent = "Cuestionario de intereses";
    activarNav("navCuestionario");
    window.scrollTo(0, 0);
  }

  function cerrar(idNav) {
    $("cuestionario").classList.add("hidden");
    activarNav(idNav);
  }

  // ---------- eventos ----------
  $("quizPreguntas").addEventListener("change", e => {
    const input = e.target;
    if (input.type !== "radio" || !input.dataset.pregunta) return;
    respuestas[input.dataset.pregunta] = Number(input.value);
    $(`card-${input.dataset.pregunta}`).classList.remove("pendiente");
    ocultarAviso();
    guardar();
    actualizarProgreso();
  });

  $("btnQuizAnterior").addEventListener("click", anterior);
  $("btnQuizSiguiente").addEventListener("click", siguiente);
  $("btnQuizRevisar").addEventListener("click", revisar);
  $("btnQuizReiniciar").addEventListener("click", reiniciar);
  $("navCuestionario").addEventListener("click", abrir);
  // T-59 · acceso desde la pantalla principal
  $("btnBannerCuestionario").addEventListener("click", abrir);
  $("navInicio").addEventListener("click", () => cerrar("navInicio"));
  $("navExplorar").addEventListener("click", () => cerrar("navExplorar"));
  $("btnVolver").addEventListener("click", () => cerrar("navExplorar"));

  // ---------- inicio ----------
  cargar();
  renderArea();

  window.Cuestionario = {
    obtenerRespuestas: () => ({ ...respuestas }),
    estaCompleto: () => faltantesTotal().length === 0,
    revisar,
    reiniciar
  };
})();
