// HU-45 · Mi pasaporte ITSX: agenda, calendario personal, sellos y enlaces
const CLAVE_PASAPORTE = "tct_pasaporte";

function leerPasaporte() {
  try {
    const p = JSON.parse(localStorage.getItem(CLAVE_PASAPORTE));
    return { ir: Array.isArray(p && p.ir) ? p.ir : [], sellos: (p && p.sellos) || {} };
  } catch (e) { return { ir: [], sellos: {} }; }
}
function guardarPasaporte(p) {
  try { localStorage.setItem(CLAVE_PASAPORTE, JSON.stringify(p)); } catch (e) { /* sin almacenamiento: se usa solo en esta visita */ }
}
const pasaporte = leerPasaporte();

function estaEnAgenda(id) { return pasaporte.ir.includes(id); }
function alternarQuieroIr(id) {
  if (estaEnAgenda(id)) pasaporte.ir = pasaporte.ir.filter(x => x !== id);
  else pasaporte.ir.push(id);
  guardarPasaporte(pasaporte);
  return estaEnAgenda(id);
}

// Cada tarea agrega sus botones a las tarjetas del calendario y su manejador de clics
const accionesEvento = [];         // funciones (ev) => HTML
const manejadoresAccion = {};      // nombre de la acción => función (id del evento, botón)
function buscarEvento(id) { return eventosEstado.lista.find(e => e.id === id); }

accionesEvento.push(ev => `<button type="button" class="pas-btn${estaEnAgenda(ev.id) ? " activo" : ""}" data-accion="ir" data-id="${escHTML(ev.id)}" aria-pressed="${estaEnAgenda(ev.id)}">${estaEnAgenda(ev.id) ? "✓ Voy a ir" : "Quiero ir"}</button>`);
manejadoresAccion.ir = (id, boton) => {
  const va = alternarQuieroIr(id);
  boton.classList.toggle("activo", va); boton.setAttribute("aria-pressed", String(va));
  boton.textContent = va ? "✓ Voy a ir" : "Quiero ir";
  if (va) document.dispatchEvent(new CustomEvent("quiero-ir", { detail: { id } }));
};

document.addEventListener("calendario:render", () => {
  document.querySelectorAll(".ev-acciones").forEach(caja => {
    const ev = buscarEvento(caja.dataset.ev);
    if (ev) caja.innerHTML = accionesEvento.map(f => f(ev)).join("");
  });
});
document.addEventListener("click", e => {
  const b = e.target.closest("[data-accion]");
  if (b && manejadoresAccion[b.dataset.accion]) manejadoresAccion[b.dataset.accion](b.dataset.id, b);
});

// ---- Pantalla Mi pasaporte
function abrirPasaporte() {
  mostrarSeccion("pasaporte", "Mi pasaporte ITSX", "navPasaporte");
  document.getElementById("pasaporte").innerHTML = `
    <div class="pas-hero"><p class="eyebrow">TU PASAPORTE</p><h1>Mi pasaporte ITSX</h1>
      <p class="lead">Guarda los eventos a los que quieres ir y colecciona sellos al explorar. Todo se guarda en este navegador.</p></div>
    <section aria-labelledby="pasAgendaTit"><h2 id="pasAgendaTit">Mi agenda</h2><div id="pasAgenda" class="ev-lista"></div></section>
    <section aria-labelledby="pasSellosTit"><h2 id="pasSellosTit">Mis sellos</h2><div id="pasSellos"></div></section>`;
  cargarEventos().then(pintarAgenda);
  document.dispatchEvent(new CustomEvent("pasaporte:abierto"));
}

function pintarAgenda() {
  const caja = document.getElementById("pasAgenda");
  if (!caja) return;
  const lista = pasaporte.ir.map(buscarEvento).filter(Boolean).filter(e => e.fecha >= hoyISO());
  caja.innerHTML = lista.length ? lista.map(e => tarjetaEventoHTML(e, false, "ag-")).join("")
    : `<p class="ev-vacio">Aún no tienes eventos. Entra al <button type="button" class="pas-enlace" id="pasIrCal">calendario</button> y toca «Quiero ir».</p>`;
  const ir = document.getElementById("pasIrCal");
  if (ir) ir.addEventListener("click", () => abrirCalendario());
  document.dispatchEvent(new CustomEvent("calendario:render"));
}
// Si quitas un evento desde la agenda, la lista se actualiza
document.addEventListener("click", e => {
  if (e.target.closest('[data-accion="ir"]') && document.getElementById("pasAgenda")) setTimeout(pintarAgenda, 0);
});

// ---- Cuenta regresiva y exportar a mi calendario (.ics)
function diasFaltantes(fecha, hoy) {
  const a = new Date(hoy + "T00:00:00"), b = new Date(fecha + "T00:00:00");
  return Math.round((b - a) / 86400000);
}
function textoCuentaRegresiva(dias) {
  if (dias < 0) return "Ya pasó";
  if (dias === 0) return "Es hoy";
  if (dias === 1) return "Es mañana";
  return "Faltan " + dias + " días";
}

function escaparICS(t) {
  return String(t || "").replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");
}
// Archivo .ics: dura 2 horas y usa la hora local del evento
function generarICS(ev) {
  const [a, m, d] = ev.fecha.split("-").map(Number);
  const [h, mi] = ev.hora.split(":").map(Number);
  const f = (fecha) => fecha.getFullYear() + String(fecha.getMonth() + 1).padStart(2, "0") + String(fecha.getDate()).padStart(2, "0") + "T" + String(fecha.getHours()).padStart(2, "0") + String(fecha.getMinutes()).padStart(2, "0") + "00";
  const inicio = new Date(a, m - 1, d, h, mi), fin = new Date(a, m - 1, d, h + 2, mi);
  return ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Tu Carrera Tec//ITSX//ES", "CALSCALE:GREGORIAN", "BEGIN:VEVENT",
    "UID:" + ev.id + "@tucarreratec", "DTSTAMP:" + f(new Date()), "DTSTART:" + f(inicio), "DTEND:" + f(fin),
    "SUMMARY:" + escaparICS(ev.titulo), "LOCATION:" + escaparICS(ev.lugar + (ev.edificio ? " (Edificio " + ev.edificio + ")" : "")),
    "DESCRIPTION:" + escaparICS(ev.descripcion), "END:VEVENT", "END:VCALENDAR"].join("\r\n") + "\r\n";
}
function descargarICS(ev) {
  const blob = new Blob([generarICS(ev)], { type: "text/calendar;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob); a.download = "evento-" + ev.id + ".ics";
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

accionesEvento.push(ev => `<span class="pas-cuenta">${textoCuentaRegresiva(diasFaltantes(ev.fecha, hoyISO()))}</span>
  <button type="button" class="pas-btn" data-accion="ics" data-id="${escHTML(ev.id)}">Agregar a mi calendario</button>`);
manejadoresAccion.ics = id => { const ev = buscarEvento(id); if (ev) descargarICS(ev); };