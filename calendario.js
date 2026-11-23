// Contenido temporal de la Base (T-157): se reemplaza más adelante.
function abrirCalendario() {
  mostrarSeccion("calendario", "Calendario de eventos", "navCalendario");
  document.getElementById("calendario").innerHTML = enConstruccion("Calendario de eventos");
}
// HU-44 · Calendario de eventos y panel del jefe de carrera (archivo de Gloria)
const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
const MESES_CORTOS = MESES.map(m => m.slice(0, 3).toUpperCase());
const EDIFICIOS_LISTA = "ABCDEFGHIJKLMNO".split("");

function nombreCarrera(id) {
  const c = carreras.find(x => x.id === id);
  return c ? c.nombre : "Carrera";
}

// Tarjeta de un evento (la usan la vista previa del jefe, el calendario público y la agenda).
// "prefijo" evita ids repetidos cuando el mismo evento sale en dos pantallas.
function tarjetaEventoHTML(ev, previa, prefijo) {
  const slug = CARRERA_SLUG[ev.carreraId] || "sistemas";
  const partes = (ev.fecha || "0000-00-00").split("-");
  const mes = MESES_CORTOS[Number(partes[1]) - 1] || "";
  return `<article class="ev-tarjeta carrera-${slug}" ${previa ? "" : `id="${prefijo || "ev-"}${escHTML(ev.id)}"`}>
    <div class="ev-fecha"><b>${escHTML(partes[2])}</b><span>${mes}</span></div>
    <div class="ev-cuerpo">
      <p class="ev-tipo">${escHTML(TIPOS_EVENTO[ev.tipo] || "Evento")} · ${escHTML(nombreCarrera(ev.carreraId))}${ev.ejemplo ? ' <span class="ev-ejemplo">Ejemplo</span>' : ""}</p>
      <h4>${escHTML(ev.titulo || "Título del evento")}</h4>
      <p class="ev-meta">🕒 ${escHTML(ev.hora || "--:--")} · 📍 ${escHTML(ev.lugar || "Lugar")}${ev.edificio ? " (Edificio " + escHTML(ev.edificio) + ")" : ""}</p>
      ${ev.descripcion ? `<p class="ev-desc">${escHTML(ev.descripcion)}</p>` : ""}
      ${ev.enlace ? `<a class="ev-enlace" href="${escHTML(ev.enlace)}" target="_blank" rel="noopener">Más información ↗</a>` : ""}
      ${previa ? "" : `<div class="ev-acciones" data-ev="${escHTML(ev.id)}"></div>`}
    </div>
  </article>`;
}

// ---- Panel del jefe: formulario con vista previa y lista de sus eventos
const jefeEstado = { editando: null };

function formularioHTML() {
  return `<form id="evForm" class="ev-form" novalidate>
    <label for="evTitulo">Título</label><input id="evTitulo" maxlength="80">
    <div class="ev-fila">
      <div><label for="evFecha">Fecha</label><input id="evFecha" type="date"></div>
      <div><label for="evHora">Hora</label><input id="evHora" type="time"></div>
    </div>
    <label for="evLugar">Lugar</label><input id="evLugar" maxlength="80">
    <div class="ev-fila">
      <div><label for="evEdificio">Edificio</label><select id="evEdificio"><option value="">Sin edificio</option>${EDIFICIOS_LISTA.map(l => `<option>${l}</option>`).join("")}</select></div>
      <div><label for="evTipo">Tipo</label><select id="evTipo"><option value="">Elige…</option>${Object.keys(TIPOS_EVENTO).map(k => `<option value="${k}">${TIPOS_EVENTO[k]}</option>`).join("")}</select></div>
    </div>
    <label for="evDescripcion">Descripción (opcional)</label><textarea id="evDescripcion" rows="3" maxlength="400"></textarea>
    <label for="evEnlace">Enlace (opcional, con https://)</label><input id="evEnlace" type="url">
    <ul id="evErrores" class="ev-errores" role="alert"></ul>
    <div class="ev-botones"><button type="submit" id="evGuardar">Guardar evento</button><button type="button" id="evCancelar" class="ev-sec" hidden>Cancelar edición</button></div>
  </form>`;
}

function leerFormulario() {
  const v = id => document.getElementById(id).value;
  return { titulo: v("evTitulo"), fecha: v("evFecha"), hora: v("evHora"), lugar: v("evLugar"), edificio: v("evEdificio"), tipo: v("evTipo"), descripcion: v("evDescripcion"), enlace: v("evEnlace") };
}

function llenarFormulario(ev) {
  const p = (id, valor) => { document.getElementById(id).value = valor || ""; };
  p("evTitulo", ev.titulo); p("evFecha", ev.fecha); p("evHora", ev.hora); p("evLugar", ev.lugar);
  p("evEdificio", ev.edificio); p("evTipo", ev.tipo); p("evDescripcion", ev.descripcion); p("evEnlace", ev.enlace);
}

function actualizarVistaPrevia() {
  const ev = leerFormulario();
  ev.carreraId = sesionJefe.jefe.carreraId;
  document.getElementById("evPrevia").innerHTML = tarjetaEventoHTML(ev, true);
}

function listarMisEventos() {
  const caja = document.getElementById("evMios");
  return eventosDeMiCarrera().then(lista => {
    jefeEstado.mios = lista;
    caja.innerHTML = lista.length ? lista.map(ev => `<div class="ev-mio"><span><b>${escHTML(ev.fecha)}</b> · ${escHTML(ev.titulo)}</span>
      <button type="button" data-editar="${escHTML(ev.id)}">Editar</button><button type="button" data-borrar="${escHTML(ev.id)}" class="ev-peligro">Borrar</button></div>`).join("")
      : "<p>Aún no has publicado eventos.</p>";
  }).catch(() => { caja.innerHTML = "<p>No se pudieron cargar tus eventos. Revisa tu conexión.</p>"; });
}

function terminarEdicion() {
  jefeEstado.editando = null;
  document.getElementById("evForm").reset();
  document.getElementById("evCancelar").hidden = true;
  document.getElementById("evGuardar").textContent = "Guardar evento";
  actualizarVistaPrevia();
}

function renderPanelJefe(contenedor) {
  const jefe = sesionJefe.jefe;
  if (!jefe) { contenedor.innerHTML = ""; return; }
  contenedor.innerHTML = `<section class="ev-panel" aria-label="Panel del jefe de carrera">
    <div class="ev-panel-cab"><div><p class="eyebrow">PANEL DEL JEFE DE CARRERA</p><h3>Hola, jefe de ${escHTML(nombreCarrera(jefe.carreraId))}</h3><p class="ev-correo">${escHTML(jefe.correo)}</p></div>
      <button type="button" id="evSalir" class="ev-sec">Cerrar sesión</button></div>
    <div class="ev-panel-cols"><div>${formularioHTML()}</div><div><p class="ev-previa-tit">Así lo verá el alumno</p><div id="evPrevia"></div></div></div>
    <h4>Mis eventos</h4><div id="evMios"></div>
  </section>`;
  document.getElementById("evSalir").addEventListener("click", () => cerrarSesion());
  const form = document.getElementById("evForm");
  form.addEventListener("input", actualizarVistaPrevia);
  form.addEventListener("submit", e => {
    e.preventDefault();
    const ev = leerFormulario();
    const errores = validarEvento(ev, hoyISO());
    document.getElementById("evErrores").innerHTML = errores.map(t => `<li>${escHTML(t)}</li>`).join("");
    if (errores.length) return;
    const boton = document.getElementById("evGuardar");
    boton.disabled = true;
    guardarEvento(ev, jefeEstado.editando).then(() => {
      terminarEdicion(); listarMisEventos();
      document.dispatchEvent(new CustomEvent("eventos-cambiaron"));
    }).catch(() => {
      document.getElementById("evErrores").innerHTML = "<li>No se pudo guardar. Revisa tu conexión e inténtalo de nuevo.</li>";
    }).finally(() => { boton.disabled = false; });
  });
  document.getElementById("evCancelar").addEventListener("click", terminarEdicion);
  document.getElementById("evMios").addEventListener("click", e => {
    const ed = e.target.closest("[data-editar]"), bo = e.target.closest("[data-borrar]");
    if (ed) {
      const ev = jefeEstado.mios.find(x => x.id === ed.dataset.editar);
      jefeEstado.editando = ev.id; llenarFormulario(ev);
      document.getElementById("evCancelar").hidden = false;
      document.getElementById("evGuardar").textContent = "Guardar cambios";
      actualizarVistaPrevia(); form.scrollIntoView({ behavior: "smooth" });
    }
    if (bo) {
      if (bo.dataset.confirmar !== "si") { bo.dataset.confirmar = "si"; bo.textContent = "¿Seguro? Toca otra vez"; return; }
      borrarEvento(bo.dataset.borrar).then(() => { listarMisEventos(); document.dispatchEvent(new CustomEvent("eventos-cambiaron")); });
    }
  });
  actualizarVistaPrevia(); listarMisEventos();
}