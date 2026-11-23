
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
// ---- Calendario público: funciones puras (se pueden probar sin pantalla)
// Semanas del mes empezando en lunes. Cada día: { fecha: "AAAA-MM-DD", dia, delMes }
function construirMes(anio, mes) {
  const iso = d => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  const primero = new Date(anio, mes, 1);
  const inicio = new Date(anio, mes, 1 - ((primero.getDay() + 6) % 7));
  const semanas = [];
  for (let s = 0; s < 6; s++) {
    const fila = [];
    for (let d = 0; d < 7; d++) {
      const f = new Date(inicio.getFullYear(), inicio.getMonth(), inicio.getDate() + s * 7 + d);
      fila.push({ fecha: iso(f), dia: f.getDate(), delMes: f.getMonth() === mes });
    }
    if (s >= 4 && !fila.some(x => x.delMes)) break;
    semanas.push(fila);
  }
  return semanas;
}

// Los 7 días (lunes a domingo) de la semana que contiene a "hoy"
function semanaDe(hoy) {
  const [a, m, d] = hoy.split("-").map(Number);
  const f = new Date(a, m - 1, d);
  const lunes = new Date(a, m - 1, d - ((f.getDay() + 6) % 7));
  return Array.from({ length: 7 }, (_, i) => {
    const x = new Date(lunes.getFullYear(), lunes.getMonth(), lunes.getDate() + i);
    return x.getFullYear() + "-" + String(x.getMonth() + 1).padStart(2, "0") + "-" + String(x.getDate()).padStart(2, "0");
  });
}

function agruparPorFecha(lista) {
  const mapa = {};
  lista.forEach(e => { (mapa[e.fecha] = mapa[e.fecha] || []).push(e); });
  return mapa;
}

// ---- Calendario público: pantalla
const cal = { carrera: 0, tipo: "", vista: "mes", anio: 0, mes: 0, dia: "" };
const DIAS_CORTOS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

function abrirCalendario(carreraId) {
  const hoy = hoyISO().split("-").map(Number);
  cal.carrera = carreraId || 0; cal.tipo = ""; cal.dia = ""; cal.vista = "mes";
  cal.anio = hoy[0]; cal.mes = hoy[1] - 1;
  mostrarSeccion("calendario", "Calendario de eventos", "navCalendario");
  document.getElementById("calendario").innerHTML = `
    <div class="cal-hero"><p class="eyebrow">VIVE EL ITSX</p><h1>Calendario de eventos</h1>
      <p class="lead">Conoce las actividades que cada carrera prepara para ti. Cualquier persona puede consultarlo.</p></div>
    <div id="calJefe"></div>
    <div class="cal-filtros">
      <label>Carrera <select id="calCarrera"><option value="0">Todas</option>${carreras.map(c => `<option value="${c.id}">${escHTML(c.nombre)}</option>`).join("")}</select></label>
      <label>Tipo <select id="calTipo"><option value="">Todos</option>${Object.keys(TIPOS_EVENTO).map(k => `<option value="${k}">${TIPOS_EVENTO[k]}</option>`).join("")}</select></label>
      <div class="cal-vistas" role="group" aria-label="Vista"><button type="button" data-vista="mes" aria-pressed="true">Mes</button><button type="button" data-vista="semana" aria-pressed="false">Esta semana</button></div>
    </div>
    <p id="calAviso" class="cal-aviso"></p>
    <div id="calVista"></div>
    <h3 id="calListaTit">Próximos eventos</h3>
    <div id="calLista" class="ev-lista"></div>`;
  document.getElementById("calCarrera").value = String(cal.carrera);
  document.getElementById("calCarrera").addEventListener("change", e => { cal.carrera = Number(e.target.value); cal.dia = ""; pintarCalendario(); });
  document.getElementById("calTipo").addEventListener("change", e => { cal.tipo = e.target.value; cal.dia = ""; pintarCalendario(); });
  document.querySelectorAll(".cal-vistas button").forEach(b => b.addEventListener("click", () => {
    cal.vista = b.dataset.vista; cal.dia = "";
    document.querySelectorAll(".cal-vistas button").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
    pintarCalendario();
  }));
  renderPanelJefe(document.getElementById("calJefe"));
  return cargarEventos().then(pintarCalendario);
}

function eventosVisibles() {
  return filtrarFuturos(eventosEstado.lista, cal.carrera, hoyISO()).filter(e => !cal.tipo || e.tipo === cal.tipo);
}

function pintarCalendario() {
  if (!document.getElementById("calVista")) return;
  const lista = eventosVisibles();
  const porFecha = agruparPorFecha(lista);
  document.getElementById("calAviso").textContent = eventosEstado.origen === "respaldo" ? "No pudimos conectar con el servidor: se muestran eventos de ejemplo." : "";
  const vista = document.getElementById("calVista");
  if (cal.vista === "mes") {
    const semanas = construirMes(cal.anio, cal.mes);
    vista.innerHTML = `<div class="cal-mes"><div class="cal-nav"><button type="button" id="calAnt" aria-label="Mes anterior">‹</button>
      <strong>${MESES[cal.mes]} ${cal.anio}</strong><button type="button" id="calSig" aria-label="Mes siguiente">›</button></div>
      <div class="cal-grid">${DIAS_CORTOS.map(d => `<span class="cal-dia-nom">${d}</span>`).join("")}
      ${semanas.flat().map(d => {
        const evs = porFecha[d.fecha] || [];
        return `<button type="button" class="cal-dia${d.delMes ? "" : " fuera"}${d.fecha === hoyISO() ? " hoy" : ""}${d.fecha === cal.dia ? " sel" : ""}" data-fecha="${d.fecha}" aria-label="${d.dia} de ${MESES[Number(d.fecha.split("-")[1]) - 1]}${evs.length ? ", " + evs.length + " evento(s)" : ""}">
          <span>${d.dia}</span><span class="cal-puntos">${evs.slice(0, 3).map(e => `<i class="carrera-${CARRERA_SLUG[e.carreraId]}"></i>`).join("")}</span></button>`;
      }).join("")}</div></div>`;
    document.getElementById("calAnt").addEventListener("click", () => { cal.mes--; if (cal.mes < 0) { cal.mes = 11; cal.anio--; } cal.dia = ""; pintarCalendario(); });
    document.getElementById("calSig").addEventListener("click", () => { cal.mes++; if (cal.mes > 11) { cal.mes = 0; cal.anio++; } cal.dia = ""; pintarCalendario(); });
    vista.querySelectorAll(".cal-dia").forEach(b => b.addEventListener("click", () => { cal.dia = cal.dia === b.dataset.fecha ? "" : b.dataset.fecha; pintarCalendario(); }));
  } else {
    vista.innerHTML = `<div class="cal-semana">${semanaDe(hoyISO()).map((f, i) => {
      const evs = porFecha[f] || [];
      return `<div class="cal-sem-dia"><b>${DIAS_CORTOS[i]} ${Number(f.split("-")[2])}</b>${evs.length ? evs.map(e => `<a href="#ev-${escHTML(e.id)}" class="carrera-${CARRERA_SLUG[e.carreraId]}">${escHTML(e.hora)} ${escHTML(e.titulo)}</a>`).join("") : "<span>Sin eventos</span>"}</div>`;
    }).join("")}</div>`;
  }
  const mostrar = cal.vista === "mes" && cal.dia ? lista.filter(e => e.fecha === cal.dia) : lista;
  document.getElementById("calListaTit").textContent = cal.vista === "mes" && cal.dia ? "Eventos del " + Number(cal.dia.split("-")[2]) + " de " + MESES[Number(cal.dia.split("-")[1]) - 1] : "Próximos eventos";
  document.getElementById("calLista").innerHTML = mostrar.length ? mostrar.map(e => tarjetaEventoHTML(e, false)).join("") : `<p class="ev-vacio">No hay eventos con estos filtros.</p>`;
  document.dispatchEvent(new CustomEvent("calendario:render"));
}

// Cuando cambia la sesión o se guardan eventos, el calendario se actualiza solo
document.addEventListener("sesion-jefe", () => {
  const cont = document.getElementById("calJefe");
  if (cont) renderPanelJefe(cont);
});
document.addEventListener("eventos-cambiaron", () => { if (document.getElementById("calVista")) cargarEventos().then(pintarCalendario); });

// Resalta un evento (lo usa el enlace de "Compartir")
function resaltarEvento(id) {
  cal.carrera = 0; cal.tipo = ""; cal.dia = "";
  pintarCalendario();
  const el = document.getElementById("ev-" + id);
  if (!el) return false;
  el.classList.add("ev-resaltado"); el.scrollIntoView({ behavior: "smooth", block: "center" });
  return true;
}