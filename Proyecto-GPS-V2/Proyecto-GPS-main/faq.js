// ============================================================
// HU-10 · Preguntas y dudas frecuentes (FAQ)
// T-78 · Sección que muestra las preguntas y permite consultar varias sin salir
// ============================================================
//
// Qué hace esta sección:
//   - Toma las preguntas y respuestas de faq-datos.js (T-76).
//   - Las muestra agrupadas por tema, cada una como un desplegable.
//   - Cada desplegable se abre y se cierra de forma independiente, por lo
//     que el alumno puede tener varias respuestas abiertas a la vez sin
//     salir de la sección.
//   - Los botones de tema permiten ver solo un tema o todos.
//
// Los desplegables usan <details>/<summary>: funcionan con mouse, teclado
// (Enter o Espacio) y lectores de pantalla sin código extra.
// ============================================================

(function () {
  const $ = id => document.getElementById(id);

  // true  -> solo se muestran las preguntas con estado "Revisada" (criterio 6 de HU-10)
  // false -> se muestran todas, incluso las pendientes de revisión
  const FAQ_SOLO_REVISADAS = true;

  const secciones = ["catalogo", "detalle", "cuestionario", "resultados", "carrerasRecomendadas"];
  const navs = ["navExplorar", "navInicio", "navCuestionario", "navCarrerasRecomendadas", "navFaq"];

  // ---------- utilidades ----------
  function esc(t) {
    return String(t).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  // Convierte las direcciones web del texto en enlaces (el texto ya viene escapado)
  function conEnlaces(texto) {
    return esc(texto).replace(/https?:\/\/[^\s<]+/g, url => {
      const limpio = url.replace(/[.,;:)]+$/, "");
      return `<a href="${limpio}" target="_blank" rel="noopener noreferrer">${limpio}</a>${url.slice(limpio.length)}`;
    });
  }

  const plural = (n, uno, varios) => `${n} ${n === 1 ? uno : varios}`;

  // ---------- datos ----------
  const visibles = preguntasFaq.filter(p => !FAQ_SOLO_REVISADAS || p.estado === "Revisada");
  const grupos = temasFaq
    .map(t => ({ ...t, preguntas: visibles.filter(p => p.idTema === t.id) }))
    .filter(g => g.preguntas.length > 0);

  // ---------- dibujo de la sección ----------
  function renderFiltros() {
    $("faqFiltros").innerHTML =
      `<button type="button" class="faq-chip" data-tema="todos" aria-pressed="true">Todos</button>` +
      grupos.map(g => `<button type="button" class="faq-chip" data-tema="${g.id}" aria-pressed="false">${esc(g.nombre)}</button>`).join("");
  }

  function renderLista() {
    $("faqLista").innerHTML = grupos.map(g => `
      <section class="faq-grupo" data-tema="${g.id}" aria-labelledby="faq-tema-${g.id}">
        <div class="faq-grupo-cabecera">
          <h2 class="pill faq-tema" id="faq-tema-${g.id}">${esc(g.nombre)}</h2>
          <span class="faq-cuenta">${plural(g.preguntas.length, "pregunta", "preguntas")}</span>
        </div>
        <div class="faq-items">
          ${g.preguntas.map(p => `
            <details class="faq-item" id="faq-${p.id}">
              <summary>
                <span class="faq-pregunta">${esc(p.pregunta)}</span>
                <span class="faq-icono" aria-hidden="true"></span>
              </summary>
              <p class="faq-respuesta">${conEnlaces(p.respuesta)}</p>
            </details>
          `).join("")}
        </div>
      </section>
    `).join("");

    $("faqTotal").textContent = `${plural(grupos.length, "tema", "temas")} · ${plural(visibles.length, "pregunta", "preguntas")}`;
  }

  // Muestra un tema o todos. Los grupos solo se ocultan (no se vuelven a dibujar),
  // así las respuestas que el alumno ya abrió siguen abiertas.
  function filtrar(idTema) {
    document.querySelectorAll("#faqFiltros .faq-chip").forEach(b => {
      b.setAttribute("aria-pressed", String(b.dataset.tema === idTema));
    });
    document.querySelectorAll("#faqLista .faq-grupo").forEach(g => {
      g.classList.toggle("hidden", idTema !== "todos" && g.dataset.tema !== idTema);
    });
  }

  // ---------- navegación del sitio ----------
  function abrir() {
    secciones.forEach(id => $(id).classList.add("hidden"));
    $("faq").classList.remove("hidden");
    $("breadcrumb").textContent = "Preguntas frecuentes";
    navs.forEach(n => $(n).classList.toggle("activo", n === "navFaq"));
    window.scrollTo(0, 0);
  }

  function cerrar() {
    $("faq").classList.add("hidden");
    $("navFaq").classList.remove("activo");
  }

  // ---------- eventos ----------
  $("navFaq").addEventListener("click", abrir);
  $("faqFiltros").addEventListener("click", e => {
    const chip = e.target.closest(".faq-chip");
    if (chip) filtrar(chip.dataset.tema);
  });
  // Al usar el resto del menú lateral, la sección FAQ se cierra
  ["navExplorar", "navInicio", "navCuestionario", "navCarrerasRecomendadas"].forEach(id => $(id).addEventListener("click", cerrar));

  // ---------- inicio ----------
  if (grupos.length === 0) {
    $("faqFiltros").classList.add("hidden");
    $("faqVacio").classList.remove("hidden");
    $("faqTotal").textContent = "0 preguntas";
  } else {
    renderFiltros();
    renderLista();
  }

  window.Faq = { abrir, preguntasVisibles: () => visibles.map(p => ({ ...p })) };
})();
