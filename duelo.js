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

// Muestra la pantalla final con la carrera ganadora
function pintarGanadora(id) {
    dueloEstado.vista = "ganadora";

    const c = carreras.find(x => x.id === Number(id));

    if (!c) {
        document.getElementById("duelo").innerHTML =
            "<p>No se pudo encontrar la carrera ganadora.</p>";
        return;
    }

    const slug = CARRERA_SLUG[c.id];

    document.getElementById("duelo").innerHTML = `
        <div class="du-hero">
            <p class="eyebrow">RESULTADO FINAL</p>
            <h1>¡Tenemos una ganadora!</h1>
            <p>Esta es la carrera que elegiste al finalizar tus duelos.</p>
        </div>

        <div class="du-escenario">
            <div class="du-carta gana">
                <img src="recursos/${slug}/icono.svg"
                     alt=""
                     width="64"
                     height="64">

                <span class="du-nombre">${escHTML(c.nombre)}</span>
                <span class="du-texto">${escHTML(c.resumen)}</span>
            </div>
        </div>
    `;
}


// HU-46 · Pantalla inicial para elegir las carreras del duelo
function pintarElegir() {
    dueloEstado.vista = "elegir";

    const contenedor = document.getElementById("duelo");

    contenedor.innerHTML = `
        <div class="du-hero">
            <p class="eyebrow">DUELO DE CARRERAS</p>
            <h1>¿Qué carreras quieres enfrentar?</h1>
            <p>Selecciona entre 2 y 5 carreras para comenzar tu duelo.</p>
        </div>

        <div class="du-seleccion">
            <div class="du-seleccion-info">
                <p id="duMensaje">Elige al menos 2 carreras.</p>
                <span>Máximo 5 carreras</span>
            </div>

            <div class="du-lista-carreras">
                ${carreras.map(c => {
                    const slug = CARRERA_SLUG[c.id];

                    return `
                        <label class="du-opcion">
                            <input
                                type="checkbox"
                                class="du-checkbox"
                                value="${c.id}"
                            >

                            <img
                                src="recursos/${slug}/icono.svg"
                                alt=""
                                width="40"
                                height="40"
                            >

                            <span>${escHTML(c.nombre)}</span>
                        </label>
                    `;
                }).join("")}
            </div>

            <button id="duEmpezar" class="du-empezar" disabled>
                Empezar el duelo
            </button>
        </div>
    `;

    const checks = contenedor.querySelectorAll(".du-checkbox");
    const mensaje = document.getElementById("duMensaje");
    const boton = document.getElementById("duEmpezar");

    function actualizarSeleccion() {
        const seleccionadas = [...checks]
            .filter(check => check.checked);

        const cantidad = seleccionadas.length;

        mensaje.textContent = cantidad < 2
            ? "Elige al menos 2 carreras."
            : `${cantidad} carreras elegidas.`;

        boton.disabled = cantidad < 2;

        checks.forEach(check => {
            check.disabled =
                !check.checked && cantidad >= 5;
        });
    }

    checks.forEach(check => {
        check.addEventListener("change", actualizarSeleccion);
    });

    boton.addEventListener("click", () => {
        const ids = [...checks]
            .filter(check => check.checked)
            .map(check => Number(check.value));

        if (ids.length < 2 || ids.length > 5) return;

        abrirDuelo(ids);
    });
}
